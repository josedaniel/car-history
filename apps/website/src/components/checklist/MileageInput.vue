<script setup lang="ts">
import { ref, computed } from "vue";
import { Gauge } from "lucide-vue-next";

const emit = defineEmits<{ submit: [km: number] }>();

const rawInput = ref("");
const error = ref("");
const focused = ref(false);

const displayValue = computed(() =>
  rawInput.value ? Number(rawInput.value).toLocaleString("es-CO") : "0",
);

function handleInput(e: Event) {
  const val = (e.target as HTMLInputElement).value.replace(/\D/g, "");
  if (val.length <= 7) {
    rawInput.value = val;
    error.value = "";
  }
}

function submit() {
  const km = Number(rawInput.value);
  if (!rawInput.value || km === 0) {
    error.value = "Ingresa el kilometraje actual del carro";
    return;
  }
  emit("submit", km);
}
</script>

<template>
  <div class="screen">
    <!-- ── Background decoration ── -->
    <div class="bg-art" aria-hidden="true">
      <svg viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Concentric rings -->
        <circle cx="350" cy="350" r="320" stroke="#FF6B1A" stroke-width="0.75" opacity="0.07" />
        <circle cx="350" cy="350" r="270" stroke="#FF6B1A" stroke-width="0.75" opacity="0.05" />
        <circle cx="350" cy="350" r="220" stroke="#FF6B1A" stroke-width="1" opacity="0.04" />
        <!-- Partial arc overlay (speedometer) — 270° arc -->
        <circle
          cx="350"
          cy="350"
          r="295"
          stroke="#FF6B1A"
          stroke-width="2"
          opacity="0.14"
          stroke-dasharray="1394 272"
          stroke-dashoffset="408"
          stroke-linecap="round"
        />
        <!-- Tick marks -->
        <g stroke="#FF6B1A" stroke-width="1.5" opacity="0.15">
          <line x1="350" y1="30" x2="350" y2="58" />
          <line x1="350" y1="642" x2="350" y2="670" />
          <line x1="30" y1="350" x2="58" y2="350" />
          <line x1="642" y1="350" x2="670" y2="350" />
        </g>
        <g stroke="#FF6B1A" stroke-width="1" opacity="0.1">
          <line x1="576" y1="124" x2="556" y2="144" />
          <line x1="124" y1="124" x2="144" y2="144" />
          <line x1="576" y1="576" x2="556" y2="556" />
          <line x1="124" y1="576" x2="144" y2="556" />
        </g>
        <!-- Corner brackets -->
        <path d="M0 60 L0 0 L60 0" stroke="#FF6B1A" stroke-width="2" opacity="0.25" fill="none" />
        <path
          d="M640 0 L700 0 L700 60"
          stroke="#FF6B1A"
          stroke-width="2"
          opacity="0.25"
          fill="none"
        />
        <path
          d="M0 640 L0 700 L60 700"
          stroke="#FF6B1A"
          stroke-width="2"
          opacity="0.25"
          fill="none"
        />
        <path
          d="M700 640 L700 700 L640 700"
          stroke="#FF6B1A"
          stroke-width="2"
          opacity="0.25"
          fill="none"
        />
      </svg>
    </div>

    <!-- ── Content ── -->
    <div class="content">
      <div class="label-row">
        <Gauge :size="14" />
        <span>CONTROL DE MANTENIMIENTO</span>
      </div>

      <h1 class="heading">¿Cuántos <em>kilómetros</em><br />tiene tu carro?</h1>

      <p class="subtitle">
        Ingresa el kilometraje actual y te mostramos<br />todo lo que debes revisar.
      </p>

      <!-- Odometer input -->
      <div class="odo-wrap" :class="{ focused }" @click="($refs.inp as HTMLInputElement).focus()">
        <span class="odo-value">{{ displayValue }}</span>
        <span class="odo-unit">km</span>
        <input
          ref="inp"
          type="number"
          class="odo-input"
          :value="rawInput"
          @input="handleInput"
          @focus="focused = true"
          @blur="focused = false"
          @keyup.enter="submit"
          placeholder="0"
          min="0"
          max="9999999"
          inputmode="numeric"
        />
      </div>

      <p v-if="error" class="error-msg">{{ error }}</p>

      <button class="cta-btn" @click="submit">
        <span>Ver checklist de mantenimiento</span>
        <span class="arrow">→</span>
      </button>

      <p class="hint">Ej: 45000, 120000, 250000 km</p>
    </div>
  </div>
</template>

<style scoped>
/* Layout */
.screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #080808;
  position: relative;
  overflow: hidden;
}

.bg-art {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.bg-art svg {
  width: min(90vw, 700px);
  height: min(90vw, 700px);
}

/* Radial glow */
.screen::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 60% at 50% 50%, #ff6b1a0a 0%, transparent 70%);
  pointer-events: none;
}

/* Content */
.content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem 1.5rem;
  max-width: 480px;
  width: 100%;
  animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* Label */
.label-row {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #ff6b1a;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  margin-bottom: 1.6rem;
}

/* Heading */
.heading {
  font-size: clamp(2rem, 6vw, 2.9rem);
  font-weight: 700;
  line-height: 1.18;
  color: #f0f0f0;
  margin-bottom: 0.9rem;
}
.heading em {
  font-style: normal;
  color: #ff6b1a;
}

/* Subtitle */
.subtitle {
  font-size: 0.85rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 2.2rem;
}

/* Odometer */
.odo-wrap {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  gap: 0.6rem;
  background: #111;
  border: 1px solid #242424;
  border-radius: 14px;
  padding: 1.4rem 2.5rem;
  cursor: text;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  width: 100%;
  justify-content: center;
  margin-bottom: 0.6rem;
}
.odo-wrap.focused {
  border-color: #ff6b1a55;
  box-shadow:
    0 0 0 3px #ff6b1a0f,
    inset 0 0 40px #ff6b1a06;
}
.odo-value {
  font-family: "Space Mono", monospace;
  font-size: clamp(2.8rem, 10vw, 4rem);
  font-weight: 700;
  color: #f0f0f0;
  letter-spacing: 0.04em;
  pointer-events: none;
  min-width: 3ch;
  text-align: right;
}
.odo-unit {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ff6b1a;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
  pointer-events: none;
}
.odo-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: text;
  border: none;
  background: transparent;
  width: 100%;
  font-size: 4rem;
}

/* Error */
.error-msg {
  font-size: 0.78rem;
  color: #ef4444;
  letter-spacing: 0.04em;
  margin-bottom: 0.75rem;
}

/* CTA Button */
.cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  width: 100%;
  padding: 0.95rem 1.5rem;
  background: #ff6b1a;
  color: #080808;
  border: none;
  border-radius: 10px;
  font-family: "Chakra Petch", sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s,
    box-shadow 0.2s;
  margin-top: 1rem;
}
.cta-btn:hover {
  background: #ff8438;
  transform: translateY(-2px);
  box-shadow: 0 10px 32px #ff6b1a40;
}
.cta-btn:active {
  transform: translateY(0);
}

.arrow {
  font-size: 1.1rem;
  transition: transform 0.2s;
}
.cta-btn:hover .arrow {
  transform: translateX(4px);
}

/* Hint */
.hint {
  margin-top: 1rem;
  font-size: 0.72rem;
  color: #333;
  letter-spacing: 0.05em;
}

/* Animation */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
