import { batteryDB } from "./battery-db.js";

export function getBattery(model, variant) {
  model = model.toLowerCase();
  variant = variant.toLowerCase();

  const entries = batteryDB[model];

  if (!entries) {
    console.warn("Model niet gevonden:", model);
    return null;
  }

  let match = entries.find(v =>
    variant.includes(v.variant)
  );

  if (!match) match = entries[0];

  return match;
}
