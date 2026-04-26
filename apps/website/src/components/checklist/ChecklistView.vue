<script setup lang="ts">
import { ref, computed } from "vue";
import { ArrowLeft, ChevronDown, RotateCcw } from "lucide-vue-next";
import ChecklistItem from "./ChecklistItem.vue";
import { buildChecklist, CATEGORIES, type Category, type ItemStatus } from "./maintenanceData.ts";

const props = defineProps<{ mileage: number }>();
const emit = defineEmits<{ back: [] }>();

type Filter = "todos" | ItemStatus;

const activeFilter = ref<Filter>("todos");
const collapsedCategories = ref<Set<Category>>(new Set());

// Persist checked state per mileage in localStorage
const storageKey = `carcheck-${props.mileage}`;
const savedChecked = JSON.parse(localStorage.getItem(storageKey) ?? "[]") as string[];
const checkedIds = ref<Set<string>>(new Set(savedChecked));

const entries = computed(() => buildChecklist(props.mileage, checkedIds.value));

const counts = computed(() => ({
  total: entries.value.length,
  vencido: entries.value.filter((e) => e.status === "vencido").length,
  proximo: entries.value.filter((e) => e.status === "proximo").length,
  alDia: entries.value.filter((e) => e.status === "al-dia").length,
  checked: entries.value.filter((e) => e.checked).length,
}));

const progress = computed(() =>
  counts.value.total ? Math.round((counts.value.checked / counts.value.total) * 100) : 0,
);

const groups = computed(() => {
  return (Object.keys(CATEGORIES) as Category[])
    .map((cat) => {
      const items = entries.value.filter((e) => {
        if (e.category !== cat) return false;
        if (activeFilter.value === "todos") return true;
        return e.status === activeFilter.value;
      });
      return { cat, items, cfg: CATEGORIES[cat] };
    })
    .filter((g) => g.items.length > 0);
});

function toggleItem(id: string) {
  const next = new Set(checkedIds.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  checkedIds.value = next;
  localStorage.setItem(storageKey, JSON.stringify([...next]));
}

function toggleCategory(cat: Category) {
  const next = new Set(collapsedCategories.value);
  if (next.has(cat)) next.delete(cat);
  else next.add(cat);
  collapsedCategories.value = next;
}

function resetChecked() {
  checkedIds.value = new Set();
  localStorage.removeItem(storageKey);
}

const FILTERS: { key: Filter; label: string; color?: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "vencido", label: "Vencido", color: "#EF4444" },
  { key: "proximo", label: "Próximo", color: "#F59E0B" },
  { key: "al-dia", label: "Al día", color: "#22C55E" },
];
</script>

<template>
  <div class="view">
    <!-- ── Sticky Header ── -->
    <header class="header">
      <button class="back-btn" @click="emit('back')">
        <ArrowLeft :size="16" />
        <span>Cambiar km</span>
      </button>

      <div class="mileage-badge">
        <span class="mileage-num">{{ mileage.toLocaleString("es-CO") }}</span>
        <span class="mileage-unit">km</span>
      </div>

      <button class="reset-btn" title="Limpiar revisados" @click="resetChecked">
        <RotateCcw :size="15" />
      </button>
    </header>

    <!-- ── Progress bar ── -->
    <div class="prog-track">
      <div class="prog-fill" :style="{ width: `${progress}%` }" />
    </div>

    <!-- ── Main ── -->
    <main class="main">
      <!-- Title + stats -->
      <section class="hero">
        <h1 class="title">Checklist de<br /><span class="accent">Mantenimiento</span></h1>

        <div class="stats">
          <div class="stat stat--vencido">
            <div class="stat-val">{{ counts.vencido }}</div>
            <div class="stat-lbl">Vencidos</div>
          </div>
          <div class="stat stat--proximo">
            <div class="stat-val">{{ counts.proximo }}</div>
            <div class="stat-lbl">Próximos</div>
          </div>
          <div class="stat stat--aldia">
            <div class="stat-val">{{ counts.alDia }}</div>
            <div class="stat-lbl">Al día</div>
          </div>
          <div class="stat stat--checked">
            <div class="stat-val">
              {{ counts.checked }}<span class="stat-of">/{{ counts.total }}</span>
            </div>
            <div class="stat-lbl">Revisados</div>
          </div>
        </div>

        <!-- Progress label -->
        <div class="prog-label">
          <span class="prog-pct">{{ progress }}%</span>
          <span class="prog-text">completado</span>
        </div>
      </section>

      <!-- ── Filters ── -->
      <div class="filters" role="group" aria-label="Filtrar por estado">
        <button
          v-for="f in FILTERS"
          :key="f.key"
          class="filter"
          :class="{ 'filter--active': activeFilter === f.key }"
          :style="
            activeFilter === f.key && f.color
              ? { borderColor: f.color, color: f.color, background: f.color + '12' }
              : {}
          "
          @click="activeFilter = f.key"
        >
          {{ f.label }}
          <span v-if="f.key !== 'todos'" class="filter-badge">
            {{
              f.key === "vencido"
                ? counts.vencido
                : f.key === "proximo"
                  ? counts.proximo
                  : counts.alDia
            }}
          </span>
        </button>
      </div>

      <!-- ── Empty state ── -->
      <div v-if="groups.length === 0" class="empty">
        <p>✓ No hay ítems en esta categoría.</p>
      </div>

      <!-- ── Category groups ── -->
      <div class="groups">
        <div v-for="g in groups" :key="g.cat" class="group" :style="{ '--cc': g.cfg.color }">
          <!-- Category header -->
          <button class="cat-header" @click="toggleCategory(g.cat)">
            <div class="cat-left">
              <span class="cat-emoji" aria-hidden="true">{{ g.cfg.emoji }}</span>
              <span class="cat-label">{{ g.cfg.label }}</span>
              <span class="cat-count">{{ g.items.length }}</span>
              <!-- Dot indicators for vencido/proximo -->
              <span
                v-if="g.items.some((i) => i.status === 'vencido')"
                class="cat-dot cat-dot--vencido"
                title="Tiene ítems vencidos"
              />
              <span
                v-else-if="g.items.some((i) => i.status === 'proximo')"
                class="cat-dot cat-dot--proximo"
                title="Tiene ítems próximos"
              />
            </div>
            <ChevronDown
              :size="15"
              class="cat-chevron"
              :class="{ 'cat-chevron--closed': collapsedCategories.has(g.cat) }"
            />
          </button>

          <!-- Items -->
          <Transition name="collapse">
            <div v-if="!collapsedCategories.has(g.cat)" class="cat-items">
              <ChecklistItem
                v-for="(item, idx) in g.items"
                :key="item.id"
                :item="item"
                :index="idx"
                @toggle="toggleItem"
              />
            </div>
          </Transition>
        </div>
      </div>

      <!-- Footer -->
      <footer class="foot-note">
        Los intervalos son orientativos. Consulta el manual de tu vehículo.
      </footer>
    </main>
  </div>
</template>

<style scoped>
/* ── Layout ── */
.view {
  min-height: 100vh;
  background: #080808;
}

/* ── Header ── */
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.25rem;
  background: #0a0a0a;
  border-bottom: 1px solid #181818;
  backdrop-filter: blur(12px);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: none;
  border: 1px solid #252525;
  border-radius: 7px;
  padding: 0.45rem 0.85rem;
  color: #777;
  font-family: "Chakra Petch", sans-serif;
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.2s;
}
.back-btn:hover {
  color: #ddd;
  border-color: #ff6b1a44;
}

.mileage-badge {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}
.mileage-num {
  font-family: "Space Mono", monospace;
  font-size: 1.3rem;
  font-weight: 700;
  color: #f0f0f0;
}
.mileage-unit {
  font-size: 0.7rem;
  color: #ff6b1a;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.reset-btn {
  background: none;
  border: 1px solid #252525;
  border-radius: 7px;
  padding: 0.45rem 0.55rem;
  color: #444;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}
.reset-btn:hover {
  color: #aaa;
  border-color: #333;
}

/* ── Progress bar ── */
.prog-track {
  height: 2px;
  background: #141414;
}
.prog-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff6b1a, #ffb800);
  transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

/* ── Main ── */
.main {
  max-width: 680px;
  margin: 0 auto;
  padding: 2rem 1.25rem 5rem;
}

/* ── Hero ── */
.hero {
  margin-bottom: 2rem;
}

.title {
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  font-weight: 700;
  line-height: 1.18;
  margin-bottom: 1.4rem;
  color: #f0f0f0;
}
.accent {
  color: #ff6b1a;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.65rem;
  margin-bottom: 0.9rem;
}
@media (max-width: 480px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat {
  background: #111;
  border: 1px solid #1c1c1c;
  border-radius: 10px;
  padding: 0.9rem 0.75rem;
  text-align: center;
}
.stat--vencido {
  border-color: #ef444422;
}
.stat--proximo {
  border-color: #f59e0b22;
}
.stat--aldia {
  border-color: #22c55e22;
}
.stat--checked {
  border-color: #3b82f622;
}

.stat-val {
  font-family: "Space Mono", monospace;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
  line-height: 1;
}
.stat-of {
  font-size: 0.85rem;
  color: #444;
}
.stat--vencido .stat-val {
  color: #ef4444;
}
.stat--proximo .stat-val {
  color: #f59e0b;
}
.stat--aldia .stat-val {
  color: #22c55e;
}
.stat--checked .stat-val {
  color: #3b82f6;
}

.stat-lbl {
  font-size: 0.6rem;
  color: #444;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.prog-label {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}
.prog-pct {
  font-family: "Space Mono", monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: #ff6b1a;
}
.prog-text {
  font-size: 0.72rem;
  color: #444;
  letter-spacing: 0.08em;
}

/* ── Filters ── */
.filters {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}
.filter {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.42rem 0.95rem;
  background: #111;
  border: 1px solid #1e1e1e;
  border-radius: 100px;
  font-family: "Chakra Petch", sans-serif;
  font-size: 0.78rem;
  color: #555;
  cursor: pointer;
  transition: all 0.2s;
}
.filter:hover {
  color: #bbb;
  border-color: #2a2a2a;
}
.filter--active {
  color: #ff6b1a;
  border-color: #ff6b1a55;
  background: #ff6b1a0d;
}

.filter-badge {
  font-family: "Space Mono", monospace;
  font-size: 0.65rem;
  padding: 1px 5px;
  background: #1c1c1c;
  border-radius: 100px;
}

/* ── Empty ── */
.empty {
  text-align: center;
  color: #333;
  padding: 4rem 1rem;
  font-size: 0.88rem;
}

/* ── Groups ── */
.groups {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.group {
  background: #0e0e0e;
  border: 1px solid #1a1a1a;
  border-radius: 11px;
  overflow: hidden;
}

/* Category header */
.cat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.85rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}
.cat-header:hover {
  background: #141414;
}

.cat-left {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}
.cat-emoji {
  font-size: 0.95rem;
}
.cat-label {
  font-family: "Chakra Petch", sans-serif;
  font-size: 0.77rem;
  font-weight: 700;
  color: #c0c0c0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.cat-count {
  font-family: "Space Mono", monospace;
  font-size: 0.65rem;
  color: var(--cc, #ff6b1a);
  background: #181818;
  padding: 1px 6px;
  border-radius: 100px;
}
.cat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.cat-dot--vencido {
  background: #ef4444;
  box-shadow: 0 0 6px #ef4444;
}
.cat-dot--proximo {
  background: #f59e0b;
  box-shadow: 0 0 6px #f59e0b;
}

.cat-chevron {
  color: #333;
  transition: transform 0.2s;
}
.cat-chevron--closed {
  transform: rotate(-90deg);
}

/* Items area */
.cat-items {
  border-top: 1px solid #171717;
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 0.5rem;
  background: #0a0a0a;
}

/* Collapse transition */
.collapse-enter-active {
  transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.collapse-leave-active {
  transition: all 0.2s ease;
}
.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ── Footer ── */
.foot-note {
  margin-top: 3rem;
  text-align: center;
  color: #282828;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
}
</style>
