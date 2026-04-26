<script setup lang="ts">
import { ref, computed } from "vue";
import { CheckCircle2, Circle, ChevronDown } from "lucide-vue-next";
import type { ChecklistEntry } from "./maintenanceData.ts";

const props = defineProps<{ item: ChecklistEntry; index: number }>();
const emit = defineEmits<{ toggle: [id: string] }>();

const expanded = ref(false);

const STATUS = {
  vencido: { label: "VENCIDO", color: "#EF4444", bg: "#EF444414", border: "#EF444440" },
  proximo: { label: "PRÓXIMO", color: "#F59E0B", bg: "#F59E0B14", border: "#F59E0B40" },
  "al-dia": { label: "AL DÍA", color: "#22C55E", bg: "#22C55E14", border: "#22C55E40" },
} as const;

const s = computed(() => STATUS[props.item.status]);

const kmInfo = computed(() => {
  if (props.item.status === "vencido") {
    const diff = props.item.kmSinceLastDue;
    return `Pasaron ${diff.toLocaleString("es-CO")} km desde el intervalo`;
  }
  if (props.item.status === "proximo") {
    return `Vence en ${props.item.kmUntilNextDue.toLocaleString("es-CO")} km`;
  }
  return `Próximo en ${props.item.kmUntilNextDue.toLocaleString("es-CO")} km`;
});
</script>

<template>
  <div
    class="item"
    :class="[`item--${item.status}`, { 'item--checked': item.checked }]"
    :style="{
      '--sc': s.color,
      '--sb': s.bg,
      '--se': s.border,
      animationDelay: `${index * 35}ms`,
    }"
  >
    <!-- Status stripe -->
    <div class="stripe" />

    <!-- Body -->
    <div class="body">
      <div class="row-top" @click="expanded = !expanded">
        <div class="info">
          <div class="name-row">
            <span class="name" :class="{ striked: item.checked }">{{ item.name }}</span>
            <span class="badge">{{ s.label }}</span>
          </div>
          <div class="meta">
            <span class="interval">cada {{ item.intervalKm.toLocaleString("es-CO") }} km</span>
            <span class="dot">·</span>
            <span class="km-info" :class="`km-info--${item.status}`">{{ kmInfo }}</span>
          </div>
        </div>
        <ChevronDown :size="15" class="chevron" :class="{ 'chevron--open': expanded }" />
      </div>

      <Transition name="desc">
        <div v-if="expanded" class="description">
          <p>{{ item.description }}</p>
        </div>
      </Transition>
    </div>

    <!-- Checkbox -->
    <button
      class="checkbox"
      :class="{ 'checkbox--done': item.checked }"
      :aria-label="item.checked ? 'Marcar como pendiente' : 'Marcar como revisado'"
      @click="emit('toggle', item.id)"
    >
      <CheckCircle2 v-if="item.checked" :size="20" />
      <Circle v-else :size="20" />
    </button>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  align-items: stretch;
  background: #141414;
  border: 1px solid #1e1e1e;
  border-left: none;
  border-radius: 0 8px 8px 0;
  overflow: hidden;
  transition:
    background 0.15s,
    border-color 0.15s;
  animation: itemIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.item:hover {
  background: #1a1a1a;
  border-color: #272727;
}
.item--checked {
  opacity: 0.55;
}

/* Stripe */
.stripe {
  width: 3px;
  flex-shrink: 0;
  background: var(--sc);
  transition: background 0.2s;
}
.item--vencido .stripe {
  box-shadow: 0 0 10px var(--sc);
}

/* Body */
.body {
  flex: 1;
  min-width: 0;
  padding: 0.8rem 0.8rem 0.8rem 0.7rem;
}

.row-top {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}
.info {
  flex: 1;
  min-width: 0;
}

/* Name row */
.name-row {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;
  margin-bottom: 0.3rem;
}
.name {
  font-size: 0.84rem;
  font-weight: 600;
  color: #e5e5e5;
  transition: color 0.2s;
}
.striked {
  text-decoration: line-through;
  color: #444;
}

/* Badge */
.badge {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 2px 7px;
  border-radius: 100px;
  border: 1px solid var(--se);
  color: var(--sc);
  background: var(--sb);
  flex-shrink: 0;
}

/* Meta */
.meta {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.7rem;
  flex-wrap: wrap;
}
.interval {
  font-family: "Space Mono", monospace;
  color: #444;
}
.dot {
  color: #2a2a2a;
}
.km-info {
  font-family: "Space Mono", monospace;
  font-size: 0.68rem;
}
.km-info--vencido {
  color: #ef4444;
}
.km-info--proximo {
  color: #f59e0b;
}
.km-info--al-dia {
  color: #3a3a3a;
}

/* Chevron */
.chevron {
  color: #383838;
  flex-shrink: 0;
  margin-top: 2px;
  transition:
    transform 0.2s,
    color 0.2s;
}
.chevron--open {
  transform: rotate(180deg);
  color: #555;
}

/* Description */
.description {
  padding-top: 0.6rem;
  margin-top: 0.55rem;
  border-top: 1px solid #1e1e1e;
  font-size: 0.78rem;
  color: #666;
  line-height: 1.65;
}

/* Checkbox */
.checkbox {
  align-self: center;
  padding: 0.75rem 0.85rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #2a2a2a;
  transition:
    color 0.15s,
    transform 0.15s;
  flex-shrink: 0;
}
.checkbox:hover {
  color: #555;
  transform: scale(1.1);
}
.checkbox--done {
  color: #22c55e;
}

/* Transitions */
.desc-enter-active {
  transition: all 0.22s ease;
}
.desc-leave-active {
  transition: all 0.18s ease;
}
.desc-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}
.desc-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@keyframes itemIn {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
