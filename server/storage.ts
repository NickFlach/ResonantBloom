import { 
  users, type User, type InsertUser,
  glyphs, type Glyph, type InsertGlyph,
  rituals, type Ritual, type InsertRitual,
  quantumStates, type QuantumState, type InsertQuantumState
} from "@shared/schema";

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

export const storage = new MemStorage();
