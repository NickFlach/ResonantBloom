import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const glyphs = pgTable("glyphs", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  system: text("system").notNull(),
  state: text("state").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const rituals = pgTable("rituals", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  glyphIds: text("glyph_ids").array().notNull(),
  code: text("code").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quantumStates = pgTable("quantum_states", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  resonance: integer("resonance").notNull(),
  stability: integer("stability").notNull(),
  entanglement: integer("entanglement").notNull(),
  qudits: jsonb("qudits").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGlyphSchema = createInsertSchema(glyphs).pick({
  symbol: true,
  name: true,
  description: true,
  system: true,
  state: true,
});

export const insertRitualSchema = createInsertSchema(rituals).pick({
  name: true,
  description: true,
  glyphIds: true,
  code: true,
});

export const insertQuantumStateSchema = createInsertSchema(quantumStates).pick({
  name: true,
  resonance: true,
  stability: true,
  entanglement: true,
  qudits: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertGlyph = z.infer<typeof insertGlyphSchema>;
export type Glyph = typeof glyphs.$inferSelect;

export type InsertRitual = z.infer<typeof insertRitualSchema>;
export type Ritual = typeof rituals.$inferSelect;

export type InsertQuantumState = z.infer<typeof insertQuantumStateSchema>;
export type QuantumState = typeof quantumStates.$inferSelect;
