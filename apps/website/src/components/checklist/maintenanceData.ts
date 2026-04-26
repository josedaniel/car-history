export type Category =
  | "motor"
  | "frenos"
  | "fluidos"
  | "filtros"
  | "neumaticos"
  | "electrico"
  | "transmision"
  | "general";

export type Importance = "critica" | "alta" | "media";
export type ItemStatus = "vencido" | "proximo" | "al-dia";

export interface MaintenanceItem {
  id: string;
  name: string;
  description: string;
  intervalKm: number;
  category: Category;
  importance: Importance;
}

export interface ChecklistEntry extends MaintenanceItem {
  status: ItemStatus;
  kmSinceLastDue: number;
  kmUntilNextDue: number;
  checked: boolean;
}

export const CATEGORIES: Record<Category, { label: string; emoji: string; color: string }> = {
  motor: { label: "Motor", emoji: "⚙️", color: "#FF6B1A" },
  frenos: { label: "Frenos", emoji: "🛑", color: "#EF4444" },
  fluidos: { label: "Fluidos", emoji: "💧", color: "#3B9EFF" },
  filtros: { label: "Filtros", emoji: "🌀", color: "#A78BFA" },
  neumaticos: { label: "Neumáticos", emoji: "⭕", color: "#22C55E" },
  electrico: { label: "Eléctrico", emoji: "⚡", color: "#FFB800" },
  transmision: { label: "Transmisión", emoji: "🔩", color: "#F97316" },
  general: { label: "General", emoji: "🔧", color: "#94A3B8" },
};

export const MAINTENANCE_ITEMS: MaintenanceItem[] = [
  // ── Motor ──────────────────────────────────────────────────────────────────
  {
    id: "oil-change",
    name: "Cambio de aceite y filtro",
    description:
      "Cambiar el aceite del motor y el filtro de aceite. Usar el grado de viscosidad recomendado por el fabricante (ej. 5W-30 o 10W-40). El aceite sucio pierde propiedades lubricantes y acelera el desgaste.",
    intervalKm: 5000,
    category: "motor",
    importance: "critica",
  },
  {
    id: "oil-level",
    name: "Revisión de nivel de aceite",
    description:
      "Verificar que el nivel de aceite esté entre las marcas mínima y máxima de la varilla de medición. Revisar en frío, con el carro en superficie plana.",
    intervalKm: 2500,
    category: "motor",
    importance: "alta",
  },
  {
    id: "spark-plugs",
    name: "Bujías de encendido",
    description:
      "Inspeccionar y reemplazar las bujías desgastadas. Las bujías en mal estado causan arranques difíciles, mayor consumo de combustible y pérdida de potencia.",
    intervalKm: 20000,
    category: "motor",
    importance: "alta",
  },
  {
    id: "serpentine-belt",
    name: "Correas accesorias",
    description:
      "Revisar el estado de la banda del alternador, compresor de A/C y dirección hidráulica. Buscar grietas, deshilachado o desgaste. Una correa rota puede dejar el carro varado.",
    intervalKm: 40000,
    category: "motor",
    importance: "alta",
  },
  {
    id: "timing-belt-check",
    name: "Correa de distribución — Inspección",
    description:
      "Inspeccionar el estado de la correa de distribución. Buscar grietas, endurecimiento o desgaste lateral. Fallo puede causar daño catastrófico del motor.",
    intervalKm: 60000,
    category: "motor",
    importance: "critica",
  },
  {
    id: "timing-belt-replace",
    name: "Correa de distribución — Cambio",
    description:
      "Reemplazar la correa de distribución junto con los tensores y bomba de agua si aplica. Es la reparación preventiva más importante para motores de correa.",
    intervalKm: 80000,
    category: "motor",
    importance: "critica",
  },

  // ── Frenos ─────────────────────────────────────────────────────────────────
  {
    id: "brake-pads",
    name: "Pastillas de freno",
    description:
      "Inspeccionar el grosor de las pastillas delanteras y traseras. Reemplazar si tienen menos de 3 mm. Las pastillas desgastadas pueden dañar los discos y comprometer la seguridad.",
    intervalKm: 15000,
    category: "frenos",
    importance: "critica",
  },
  {
    id: "brake-discs",
    name: "Discos de freno",
    description:
      "Verificar el estado de los discos: buscar ranuras profundas, deformación o espesor por debajo del mínimo especificado. Los discos con surcos reducen la eficacia de frenado.",
    intervalKm: 30000,
    category: "frenos",
    importance: "critica",
  },
  {
    id: "brake-fluid-check",
    name: "Líquido de frenos — Revisión",
    description:
      "Verificar el nivel y color del líquido de frenos en el depósito. El líquido oscuro o turbio indica contaminación por agua y debe cambiarse.",
    intervalKm: 15000,
    category: "frenos",
    importance: "alta",
  },
  {
    id: "brake-fluid-replace",
    name: "Líquido de frenos — Cambio",
    description:
      "Reemplazar completamente el líquido de frenos para restablecer su punto de ebullición. El líquido higroscópico absorbe humedad con el tiempo y reduce su eficacia.",
    intervalKm: 40000,
    category: "frenos",
    importance: "alta",
  },

  // ── Fluidos ────────────────────────────────────────────────────────────────
  {
    id: "coolant-level",
    name: "Nivel de refrigerante",
    description:
      "Verificar el nivel de anticongelante en el depósito de expansión. Un nivel bajo puede causar sobrecalentamiento del motor. No abrir el radiador en caliente.",
    intervalKm: 10000,
    category: "fluidos",
    importance: "alta",
  },
  {
    id: "coolant-flush",
    name: "Cambio de refrigerante",
    description:
      "Vaciar y reemplazar el refrigerante para prevenir corrosión interna y mantener la eficiencia de enfriamiento. El refrigerante viejo pierde sus inhibidores de corrosión.",
    intervalKm: 60000,
    category: "fluidos",
    importance: "alta",
  },
  {
    id: "steering-fluid",
    name: "Líquido de dirección hidráulica",
    description:
      "Revisar el nivel y estado del fluido de la dirección asistida. Un nivel bajo indica una posible fuga y dificulta el giro del volante.",
    intervalKm: 10000,
    category: "fluidos",
    importance: "media",
  },
  {
    id: "washer-fluid",
    name: "Líquido limpiaparabrisas",
    description:
      "Rellenar el depósito del lavaparabrisas con líquido específico. No usar solo agua, ya que el detergente mejora la visibilidad y evita el crecimiento de bacterias.",
    intervalKm: 5000,
    category: "fluidos",
    importance: "media",
  },

  // ── Filtros ────────────────────────────────────────────────────────────────
  {
    id: "air-filter",
    name: "Filtro de aire del motor",
    description:
      "Reemplazar el filtro de aire para mantener una mezcla aire-combustible correcta. Un filtro obstruido reduce la potencia y aumenta el consumo.",
    intervalKm: 15000,
    category: "filtros",
    importance: "alta",
  },
  {
    id: "cabin-filter",
    name: "Filtro de habitáculo (cabina)",
    description:
      "Cambiar el filtro de aire de la cabina para mantener la calidad del aire interior. Un filtro sucio reduce el flujo del A/C y acumula alérgenos.",
    intervalKm: 15000,
    category: "filtros",
    importance: "media",
  },
  {
    id: "fuel-filter",
    name: "Filtro de combustible",
    description:
      "Reemplazar el filtro de combustible para proteger los inyectores de impurezas. Un filtro obstruido puede causar arranque difícil y pérdida de potencia.",
    intervalKm: 30000,
    category: "filtros",
    importance: "alta",
  },

  // ── Neumáticos ─────────────────────────────────────────────────────────────
  {
    id: "tire-pressure",
    name: "Presión de neumáticos",
    description:
      "Verificar y ajustar la presión de los 4 neumáticos y la llanta de repuesto según las especificaciones del fabricante (placa en el marco de la puerta). Revisar en frío.",
    intervalKm: 5000,
    category: "neumaticos",
    importance: "alta",
  },
  {
    id: "tire-rotation",
    name: "Rotación de neumáticos",
    description:
      "Rotar los neumáticos para asegurar un desgaste uniforme y prolongar su vida útil. El esquema de rotación depende si el carro es tracción delantera, trasera o 4x4.",
    intervalKm: 10000,
    category: "neumaticos",
    importance: "alta",
  },
  {
    id: "wheel-alignment",
    name: "Alineación y balanceo",
    description:
      "Verificar y corregir la alineación de ruedas para evitar desgaste irregular y jalón del volante. El balanceo elimina vibraciones a alta velocidad.",
    intervalKm: 20000,
    category: "neumaticos",
    importance: "alta",
  },
  {
    id: "tire-tread",
    name: "Inspección de desgaste de llantas",
    description:
      "Revisar el dibujo y desgaste de todos los neumáticos. La profundidad mínima legal es 1.6 mm (indicador de desgaste). Buscar desgaste irregular, bultos o cortes.",
    intervalKm: 10000,
    category: "neumaticos",
    importance: "alta",
  },

  // ── Eléctrico ──────────────────────────────────────────────────────────────
  {
    id: "battery",
    name: "Revisión de batería",
    description:
      "Verificar el estado de carga, nivel de electrolito (si aplica) y terminales. Limpiar sulfatación en los bornes. Una batería débil causa arranques lentos o fallidos.",
    intervalKm: 15000,
    category: "electrico",
    importance: "alta",
  },
  {
    id: "lights",
    name: "Sistema de iluminación",
    description:
      "Revisar el funcionamiento de faros delanteros y traseros, luces de stop, direccionales, luz de reversa, luz de freno central y luces de tablero.",
    intervalKm: 10000,
    category: "electrico",
    importance: "alta",
  },
  {
    id: "alternator",
    name: "Revisión del alternador",
    description:
      "Verificar que el alternador cargue correctamente la batería (aprox. 13.5–14.5 V con motor encendido). Un alternador defectuoso descarga la batería mientras se conduce.",
    intervalKm: 20000,
    category: "electrico",
    importance: "media",
  },

  // ── Transmisión ────────────────────────────────────────────────────────────
  {
    id: "gearbox-oil",
    name: "Aceite de caja de cambios",
    description:
      "Revisar el nivel y estado del aceite de la caja de velocidades (manual o automática). El aceite viejo o con nivel bajo causa cambios duros y desgaste prematuro.",
    intervalKm: 40000,
    category: "transmision",
    importance: "alta",
  },
  {
    id: "clutch",
    name: "Sistema de embrague (manual)",
    description:
      "Verificar el juego libre del pedal de embrague (generalmente 15–25 mm) y detectar resbalamiento o chillido al soltar el pedal. Aplica solo a carros manuales.",
    intervalKm: 30000,
    category: "transmision",
    importance: "alta",
  },

  // ── General ────────────────────────────────────────────────────────────────
  {
    id: "suspension",
    name: "Suspensión y amortiguadores",
    description:
      "Inspeccionar amortiguadores, muelles, barra estabilizadora y bieletas. Los amortiguadores desgastados afectan el manejo y aumentan la distancia de frenado.",
    intervalKm: 20000,
    category: "general",
    importance: "alta",
  },
  {
    id: "steering",
    name: "Sistema de dirección",
    description:
      "Verificar el juego del volante, barras de dirección y terminales de dirección. Un exceso de juego o vibraciones en el volante indica desgaste en la dirección.",
    intervalKm: 20000,
    category: "general",
    importance: "alta",
  },
  {
    id: "bushings",
    name: "Silentblock y rótulas",
    description:
      "Revisar el estado de todos los silentblock y rótulas de la suspensión. El deterioro causa ruidos al pasar por badenes y inestabilidad en curvas.",
    intervalKm: 30000,
    category: "general",
    importance: "media",
  },
  {
    id: "exhaust",
    name: "Sistema de escape",
    description:
      "Revisar fugas, óxido o daños en el tubo de escape, silenciador y catalizador. Una fuga de escape puede permitir que gases tóxicos ingresen a la cabina.",
    intervalKm: 20000,
    category: "general",
    importance: "media",
  },
  {
    id: "wipers",
    name: "Plumas limpiaparabrisas",
    description:
      "Revisar el estado de las plumillas del limpiaparabrisas delantero y trasero. Las plumas deterioradas dejan rayas en el vidrio y reducen la visibilidad bajo lluvia.",
    intervalKm: 15000,
    category: "general",
    importance: "media",
  },
];

// ── Status calculation ────────────────────────────────────────────────────────

export function getStatus(mileage: number, intervalKm: number): ItemStatus {
  if (mileage < intervalKm) return "al-dia";

  const remainder = mileage % intervalKm;
  const overdueWindow = Math.max(300, intervalKm * 0.04);
  const upcomingWindow = Math.max(1200, intervalKm * 0.12);

  if (remainder < overdueWindow) return "vencido";
  if (intervalKm - remainder <= upcomingWindow) return "proximo";
  return "al-dia";
}

export function buildChecklist(mileage: number, checkedIds: Set<string>): ChecklistEntry[] {
  return MAINTENANCE_ITEMS.map((item) => {
    const remainder = mileage % item.intervalKm;
    return {
      ...item,
      status: getStatus(mileage, item.intervalKm),
      kmSinceLastDue: remainder,
      kmUntilNextDue: item.intervalKm - remainder,
      checked: checkedIds.has(item.id),
    };
  });
}
