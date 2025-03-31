import { 
  users, type User, type InsertUser,
  glyphs, type Glyph, type InsertGlyph,
  rituals, type Ritual, type InsertRitual,
  quantumStates, type QuantumState, type InsertQuantumState
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Glyph operations
  getGlyph(id: number): Promise<Glyph | undefined>;
  getGlyphByName(name: string): Promise<Glyph | undefined>;
  getAllGlyphs(): Promise<Glyph[]>;
  createGlyph(glyph: InsertGlyph): Promise<Glyph>;
  updateGlyph(id: number, glyph: Partial<InsertGlyph>): Promise<Glyph | undefined>;
  deleteGlyph(id: number): Promise<boolean>;
  
  // Ritual operations
  getRitual(id: number): Promise<Ritual | undefined>;
  getRitualByName(name: string): Promise<Ritual | undefined>;
  getAllRituals(): Promise<Ritual[]>;
  createRitual(ritual: InsertRitual): Promise<Ritual>;
  updateRitual(id: number, ritual: Partial<InsertRitual>): Promise<Ritual | undefined>;
  deleteRitual(id: number): Promise<boolean>;
  
  // Quantum state operations
  getQuantumState(id: number): Promise<QuantumState | undefined>;
  getQuantumStateByName(name: string): Promise<QuantumState | undefined>;
  getAllQuantumStates(): Promise<QuantumState[]>;
  createQuantumState(state: InsertQuantumState): Promise<QuantumState>;
  updateQuantumState(id: number, state: Partial<InsertQuantumState>): Promise<QuantumState | undefined>;
  deleteQuantumState(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private glyphs: Map<number, Glyph>;
  private rituals: Map<number, Ritual>;
  private quantumStates: Map<number, QuantumState>;
  private currentUserId: number;
  private currentGlyphId: number;
  private currentRitualId: number;
  private currentQuantumStateId: number;

  constructor() {
    this.users = new Map();
    this.glyphs = new Map();
    this.rituals = new Map();
    this.quantumStates = new Map();
    this.currentUserId = 1;
    this.currentGlyphId = 1;
    this.currentRitualId = 1;
    this.currentQuantumStateId = 1;
    
    // Seed with default glyphs and quantum state
    this.seedData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Glyph operations
  async getGlyph(id: number): Promise<Glyph | undefined> {
    return this.glyphs.get(id);
  }
  
  async getGlyphByName(name: string): Promise<Glyph | undefined> {
    return Array.from(this.glyphs.values()).find(
      (glyph) => glyph.name === name,
    );
  }
  
  async getAllGlyphs(): Promise<Glyph[]> {
    return Array.from(this.glyphs.values());
  }
  
  async createGlyph(insertGlyph: InsertGlyph): Promise<Glyph> {
    const id = this.currentGlyphId++;
    const createdAt = new Date();
    const glyph: Glyph = { ...insertGlyph, id, createdAt };
    this.glyphs.set(id, glyph);
    return glyph;
  }
  
  async updateGlyph(id: number, updatedGlyph: Partial<InsertGlyph>): Promise<Glyph | undefined> {
    const glyph = this.glyphs.get(id);
    if (!glyph) return undefined;
    
    const updated: Glyph = { ...glyph, ...updatedGlyph };
    this.glyphs.set(id, updated);
    return updated;
  }
  
  async deleteGlyph(id: number): Promise<boolean> {
    return this.glyphs.delete(id);
  }
  
  // Ritual operations
  async getRitual(id: number): Promise<Ritual | undefined> {
    return this.rituals.get(id);
  }
  
  async getRitualByName(name: string): Promise<Ritual | undefined> {
    return Array.from(this.rituals.values()).find(
      (ritual) => ritual.name === name,
    );
  }
  
  async getAllRituals(): Promise<Ritual[]> {
    return Array.from(this.rituals.values());
  }
  
  async createRitual(insertRitual: InsertRitual): Promise<Ritual> {
    const id = this.currentRitualId++;
    const createdAt = new Date();
    const ritual: Ritual = { ...insertRitual, id, createdAt };
    this.rituals.set(id, ritual);
    return ritual;
  }
  
  async updateRitual(id: number, updatedRitual: Partial<InsertRitual>): Promise<Ritual | undefined> {
    const ritual = this.rituals.get(id);
    if (!ritual) return undefined;
    
    const updated: Ritual = { ...ritual, ...updatedRitual };
    this.rituals.set(id, updated);
    return updated;
  }
  
  async deleteRitual(id: number): Promise<boolean> {
    return this.rituals.delete(id);
  }
  
  // Quantum state operations
  async getQuantumState(id: number): Promise<QuantumState | undefined> {
    return this.quantumStates.get(id);
  }
  
  async getQuantumStateByName(name: string): Promise<QuantumState | undefined> {
    return Array.from(this.quantumStates.values()).find(
      (state) => state.name === name,
    );
  }
  
  async getAllQuantumStates(): Promise<QuantumState[]> {
    return Array.from(this.quantumStates.values());
  }
  
  async createQuantumState(insertState: InsertQuantumState): Promise<QuantumState> {
    const id = this.currentQuantumStateId++;
    const createdAt = new Date();
    const state: QuantumState = { ...insertState, id, createdAt };
    this.quantumStates.set(id, state);
    return state;
  }
  
  async updateQuantumState(id: number, updatedState: Partial<InsertQuantumState>): Promise<QuantumState | undefined> {
    const state = this.quantumStates.get(id);
    if (!state) return undefined;
    
    const updated: QuantumState = { ...state, ...updatedState };
    this.quantumStates.set(id, updated);
    return updated;
  }
  
  async deleteQuantumState(id: number): Promise<boolean> {
    return this.quantumStates.delete(id);
  }
  
  private seedData() {
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
    
    defaultGlyphs.forEach(glyph => {
      this.createGlyph(glyph);
    });
    
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
    
    this.createQuantumState(defaultQuantumState);
  }
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Glyph operations
  async getGlyph(id: number): Promise<Glyph | undefined> {
    const [glyph] = await db.select().from(glyphs).where(eq(glyphs.id, id));
    return glyph || undefined;
  }
  
  async getGlyphByName(name: string): Promise<Glyph | undefined> {
    const [glyph] = await db.select().from(glyphs).where(eq(glyphs.name, name));
    return glyph || undefined;
  }
  
  async getAllGlyphs(): Promise<Glyph[]> {
    return await db.select().from(glyphs);
  }
  
  async createGlyph(insertGlyph: InsertGlyph): Promise<Glyph> {
    const [glyph] = await db
      .insert(glyphs)
      .values({ ...insertGlyph, createdAt: new Date() })
      .returning();
    return glyph;
  }
  
  async updateGlyph(id: number, updatedGlyph: Partial<InsertGlyph>): Promise<Glyph | undefined> {
    const [glyph] = await db
      .update(glyphs)
      .set(updatedGlyph)
      .where(eq(glyphs.id, id))
      .returning();
    return glyph || undefined;
  }
  
  async deleteGlyph(id: number): Promise<boolean> {
    const result = await db
      .delete(glyphs)
      .where(eq(glyphs.id, id))
      .returning({ id: glyphs.id });
    return result.length > 0;
  }
  
  // Ritual operations
  async getRitual(id: number): Promise<Ritual | undefined> {
    const [ritual] = await db.select().from(rituals).where(eq(rituals.id, id));
    return ritual || undefined;
  }
  
  async getRitualByName(name: string): Promise<Ritual | undefined> {
    const [ritual] = await db.select().from(rituals).where(eq(rituals.name, name));
    return ritual || undefined;
  }
  
  async getAllRituals(): Promise<Ritual[]> {
    return await db.select().from(rituals);
  }
  
  async createRitual(insertRitual: InsertRitual): Promise<Ritual> {
    const [ritual] = await db
      .insert(rituals)
      .values({ ...insertRitual, createdAt: new Date() })
      .returning();
    return ritual;
  }
  
  async updateRitual(id: number, updatedRitual: Partial<InsertRitual>): Promise<Ritual | undefined> {
    const [ritual] = await db
      .update(rituals)
      .set(updatedRitual)
      .where(eq(rituals.id, id))
      .returning();
    return ritual || undefined;
  }
  
  async deleteRitual(id: number): Promise<boolean> {
    const result = await db
      .delete(rituals)
      .where(eq(rituals.id, id))
      .returning({ id: rituals.id });
    return result.length > 0;
  }
  
  // Quantum state operations
  async getQuantumState(id: number): Promise<QuantumState | undefined> {
    const [state] = await db.select().from(quantumStates).where(eq(quantumStates.id, id));
    return state || undefined;
  }
  
  async getQuantumStateByName(name: string): Promise<QuantumState | undefined> {
    const [state] = await db.select().from(quantumStates).where(eq(quantumStates.name, name));
    return state || undefined;
  }
  
  async getAllQuantumStates(): Promise<QuantumState[]> {
    return await db.select().from(quantumStates);
  }
  
  async createQuantumState(insertState: InsertQuantumState): Promise<QuantumState> {
    const [state] = await db
      .insert(quantumStates)
      .values({ ...insertState, createdAt: new Date() })
      .returning();
    return state;
  }
  
  async updateQuantumState(id: number, updatedState: Partial<InsertQuantumState>): Promise<QuantumState | undefined> {
    const [state] = await db
      .update(quantumStates)
      .set(updatedState)
      .where(eq(quantumStates.id, id))
      .returning();
    return state || undefined;
  }
  
  async deleteQuantumState(id: number): Promise<boolean> {
    const result = await db
      .delete(quantumStates)
      .where(eq(quantumStates.id, id))
      .returning({ id: quantumStates.id });
    return result.length > 0;
  }

  // Method to seed initial data if the database is empty
  async seedDataIfEmpty(): Promise<void> {
    // Check if glyphs table is empty
    const existingGlyphs = await this.getAllGlyphs();
    if (existingGlyphs.length === 0) {
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
    
    // Check if quantum states table is empty
    const existingStates = await this.getAllQuantumStates();
    if (existingStates.length === 0) {
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

// Use database storage instead of memory storage
export const storage = new DatabaseStorage();
