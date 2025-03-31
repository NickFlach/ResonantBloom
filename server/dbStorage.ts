import { db } from './db';
import { eq } from 'drizzle-orm';
import { 
  users, type User, type InsertUser,
  glyphs, type Glyph, type InsertGlyph,
  rituals, type Ritual, type InsertRitual,
  quantumStates, type QuantumState, type InsertQuantumState
} from "@shared/schema";
import { IStorage } from './storage';

export class DbStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.id, id));
    return results[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.username, username));
    return results[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const results = await db.insert(users).values(user).returning();
    return results[0];
  }
  
  // Glyph operations
  async getGlyph(id: number): Promise<Glyph | undefined> {
    const results = await db.select().from(glyphs).where(eq(glyphs.id, id));
    return results[0];
  }
  
  async getGlyphByName(name: string): Promise<Glyph | undefined> {
    const results = await db.select().from(glyphs).where(eq(glyphs.name, name));
    return results[0];
  }
  
  async getAllGlyphs(): Promise<Glyph[]> {
    return await db.select().from(glyphs);
  }
  
  async createGlyph(glyph: InsertGlyph): Promise<Glyph> {
    const results = await db.insert(glyphs).values(glyph).returning();
    return results[0];
  }
  
  async updateGlyph(id: number, glyph: Partial<InsertGlyph>): Promise<Glyph | undefined> {
    const results = await db.update(glyphs)
      .set(glyph)
      .where(eq(glyphs.id, id))
      .returning();
    return results[0];
  }
  
  async deleteGlyph(id: number): Promise<boolean> {
    const results = await db.delete(glyphs).where(eq(glyphs.id, id)).returning();
    return results.length > 0;
  }
  
  // Ritual operations
  async getRitual(id: number): Promise<Ritual | undefined> {
    const results = await db.select().from(rituals).where(eq(rituals.id, id));
    return results[0];
  }
  
  async getRitualByName(name: string): Promise<Ritual | undefined> {
    const results = await db.select().from(rituals).where(eq(rituals.name, name));
    return results[0];
  }
  
  async getAllRituals(): Promise<Ritual[]> {
    return await db.select().from(rituals);
  }
  
  async createRitual(ritual: InsertRitual): Promise<Ritual> {
    const results = await db.insert(rituals).values(ritual).returning();
    return results[0];
  }
  
  async updateRitual(id: number, ritual: Partial<InsertRitual>): Promise<Ritual | undefined> {
    const results = await db.update(rituals)
      .set(ritual)
      .where(eq(rituals.id, id))
      .returning();
    return results[0];
  }
  
  async deleteRitual(id: number): Promise<boolean> {
    const results = await db.delete(rituals).where(eq(rituals.id, id)).returning();
    return results.length > 0;
  }
  
  // Quantum state operations
  async getQuantumState(id: number): Promise<QuantumState | undefined> {
    const results = await db.select().from(quantumStates).where(eq(quantumStates.id, id));
    return results[0];
  }
  
  async getQuantumStateByName(name: string): Promise<QuantumState | undefined> {
    const results = await db.select().from(quantumStates).where(eq(quantumStates.name, name));
    return results[0];
  }
  
  async getAllQuantumStates(): Promise<QuantumState[]> {
    return await db.select().from(quantumStates);
  }
  
  async createQuantumState(state: InsertQuantumState): Promise<QuantumState> {
    const results = await db.insert(quantumStates).values(state).returning();
    return results[0];
  }
  
  async updateQuantumState(id: number, state: Partial<InsertQuantumState>): Promise<QuantumState | undefined> {
    const results = await db.update(quantumStates)
      .set(state)
      .where(eq(quantumStates.id, id))
      .returning();
    return results[0];
  }
  
  async deleteQuantumState(id: number): Promise<boolean> {
    const results = await db.delete(quantumStates).where(eq(quantumStates.id, id)).returning();
    return results.length > 0;
  }

  // Seed initial data if database is empty
  async seedDataIfEmpty(): Promise<void> {
    // Check if any glyphs exist
    const existingGlyphs = await this.getAllGlyphs();
    if (existingGlyphs.length === 0) {
      console.log('[DbStorage] Seeding initial glyphs');
      // Seed glyphs
      const defaultGlyphs: InsertGlyph[] = [
        {
          symbol: "🜁",
          name: "BloomStellarConsole",
          description: "Primary console for SingularisPrime",
          system: "SingularisPrime",
          state: "Active"
        },
        {
          symbol: "🜇",
          name: "EntanglementStream",
          description: "Quantum messaging relay for interstellar communication",
          system: "Transatron",
          state: "Pending"
        },
        {
          symbol: "🜄",
          name: "QuditEntangleGrid",
          description: "Grid interface for quantum entanglement visualization",
          system: "MirrorBloom",
          state: "Ready"
        },
        {
          symbol: "🜹",
          name: "QuantumSilenceInit",
          description: "Initializes quantum silence protocol for secure operations",
          system: "SingularisPrime",
          state: "Paused"
        }
      ];
      
      for (const glyph of defaultGlyphs) {
        await this.createGlyph(glyph);
      }
    }
    
    // Check if any quantum states exist
    const existingStates = await this.getAllQuantumStates();
    if (existingStates.length === 0) {
      console.log('[DbStorage] Seeding initial quantum state');
      // Seed quantum state
      const defaultQuantumState: InsertQuantumState = {
        name: "AegisSeed-Δ42",
        resonance: 98,
        stability: 86,
        entanglement: 37,
        qudits: {
          grid: Array(20).fill(0).map((_, i) => ({
            id: i + 1, 
            active: [1, 3, 5, 7, 10, 13, 16, 18].includes(i)
          }))
        }
      };
      
      await this.createQuantumState(defaultQuantumState);
    }
  }
}

// Create the database storage instance
export const dbStorage = new DbStorage();