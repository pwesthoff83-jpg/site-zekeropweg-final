import { batteryDB } from "./battery-db.js";

export function getBattery(model, variant) {
  const entries = batteryDB[model];

  if (!entries) return null;

  let match = entries.find(v =>
    variant.toLowerCase().includes(v.variant)
  );

  if (!match) match = entries[0];

  return match;
}
