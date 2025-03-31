import { FC, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Glyph, Ritual, insertGlyphSchema, insertRitualSchema } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import NavigationHeader from '@/components/NavigationHeader';
import SystemDomainSidebar from '@/components/SystemDomainSidebar';
import PetalPanel from '@/components/PetalPanel';
import InteractionFooter from '@/components/InteractionFooter';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { queryClient } from '@/lib/queryClient';

// Extended schema with validation
const createGlyphSchema = insertGlyphSchema.extend({
  symbol: z.string().min(1, "Symbol is required"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  system: z.string().min(1, "System is required"),
  state: z.string().min(1, "State is required")
});

const createRitualSchema = insertRitualSchema.extend({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  glyphIds: z.array(z.string()).min(1, "At least one glyph must be selected"),
  code: z.string().min(10, "Code must be at least 10 characters")
});

const Codex: FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('spells');
  const [editingItem, setEditingItem] = useState<Glyph | Ritual | null>(null);
  
  // Fetch glyphs
  const { data: glyphs = [], isLoading: isLoadingGlyphs } = useQuery({
    queryKey: ['/api/glyphs'],
  });
  
  // Fetch rituals
  const { data: rituals = [], isLoading: isLoadingRituals } = useQuery({
    queryKey: ['/api/rituals'],
  });
  
  // Create glyph form
  const glyphForm = useForm<z.infer<typeof createGlyphSchema>>({
    resolver: zodResolver(createGlyphSchema),
    defaultValues: {
      symbol: '🜁',
      name: '',
      description: '',
      system: 'MirrorBloom',
      state: 'Ready'
    }
  });
  
  // Create ritual form
  const ritualForm = useForm<z.infer<typeof createRitualSchema>>({
    resolver: zodResolver(createRitualSchema),
    defaultValues: {
      name: '',
      description: '',
      glyphIds: [],
      code: ''
    }
  });
  
  // Create glyph mutation
  const createGlyphMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createGlyphSchema>) => {
      const response = await apiRequest('POST', '/api/glyphs', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Glyph Created",
        description: "The glyph has been added to the codex.",
        variant: "default",
      });
      glyphForm.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/glyphs'] });
    },
    onError: (error) => {
      toast({
        title: "Failed to create glyph",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive",
      });
    }
  });
  
  // Update glyph mutation
  const updateGlyphMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: Partial<z.infer<typeof createGlyphSchema>> }) => {
      const response = await apiRequest('PUT', `/api/glyphs/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Glyph Updated",
        description: "The glyph has been updated in the codex.",
        variant: "default",
      });
      setEditingItem(null);
      queryClient.invalidateQueries({ queryKey: ['/api/glyphs'] });
    },
    onError: (error) => {
      toast({
        title: "Failed to update glyph",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive",
      });
    }
  });
  
  // Create ritual mutation
  const createRitualMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createRitualSchema>) => {
      const response = await apiRequest('POST', '/api/rituals', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Ritual Created",
        description: "The ritual has been added to the codex.",
        variant: "default",
      });
      ritualForm.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/rituals'] });
    },
    onError: (error) => {
      toast({
        title: "Failed to create ritual",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive",
      });
    }
  });
  
  // Delete glyph mutation
  const deleteGlyphMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/glyphs/${id}`);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Glyph Deleted",
        description: "The glyph has been removed from the codex.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/glyphs'] });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete glyph",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive",
      });
    }
  });
  
  // Delete ritual mutation
  const deleteRitualMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/rituals/${id}`);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Ritual Deleted",
        description: "The ritual has been removed from the codex.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/rituals'] });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete ritual",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive",
      });
    }
  });
  
  // Handle submit for glyph form
  const onGlyphSubmit = (data: z.infer<typeof createGlyphSchema>) => {
    if (editingItem && 'symbol' in editingItem) {
      updateGlyphMutation.mutate({ id: editingItem.id, data });
    } else {
      createGlyphMutation.mutate(data);
    }
  };
  
  // Handle submit for ritual form
  const onRitualSubmit = (data: z.infer<typeof createRitualSchema>) => {
    createRitualMutation.mutate(data);
  };
  
  // Edit glyph
  const handleEditGlyph = (glyph: Glyph) => {
    setEditingItem(glyph);
    glyphForm.reset({
      symbol: glyph.symbol,
      name: glyph.name,
      description: glyph.description,
      system: glyph.system,
      state: glyph.state
    });
    setActiveTab('create');
  };
  
  // Delete glyph
  const handleDeleteGlyph = (id: number) => {
    if (confirm('Are you sure you want to delete this glyph?')) {
      deleteGlyphMutation.mutate(id);
    }
  };
  
  // Delete ritual
  const handleDeleteRitual = (id: number) => {
    if (confirm('Are you sure you want to delete this ritual?')) {
      deleteRitualMutation.mutate(id);
    }
  };
  
  // Get state class for badges
  const getStateClass = (state: string) => {
    switch(state) {
      case 'Active':
        return 'bg-green-400/10 text-green-400';
      case 'Pending':
        return 'bg-orange-400/10 text-orange-400';
      case 'Ready':
        return 'bg-purple-400/10 text-purple-400';
      case 'Paused':
        return 'bg-red-400/10 text-red-400';
      default:
        return 'bg-blue-400/10 text-blue-400';
    }
  };
  
  // Footer interaction options
  const interactionOptions = [
    {
      label: 'Create new Glyph',
      colorClass: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400',
      onClick: () => {
        setEditingItem(null);
        glyphForm.reset();
        setActiveTab('create');
      }
    },
    {
      label: 'Create new Ritual',
      colorClass: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400',
      onClick: () => {
        setActiveTab('createRitual');
        ritualForm.reset();
      }
    },
    {
      label: 'View Codex Spells',
      colorClass: 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-400',
      onClick: () => setActiveTab('spells')
    },
    {
      label: 'View Ritual Sequences',
      colorClass: 'bg-green-500/20 hover:bg-green-500/30 text-green-400',
      onClick: () => setActiveTab('rituals')
    }
  ];
  
  return (
    <div className="flex flex-col h-screen bg-[#0F0F1A] text-white">
      {/* Header */}
      <NavigationHeader />
      
      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SystemDomainSidebar />
        
        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Welcome Banner */}
          <div className="px-6 py-4 bg-[#1E1E2E]/40 border-b border-purple-500/20">
            <h2 className="font-['Space_Grotesk'] font-light text-blue-400 text-xl flex items-center">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Codex Manager — Memory Crystallization Interface
              </span>
              <div className="ml-3 w-2 h-4 bg-purple-500/70 animate-pulse"></div>
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              The Codex stores user-created glyphs, rituals, and memories. Create and manage your symbolic elements here.
            </p>
          </div>
          
          {/* Tabs for different sections */}
          <div className="flex-1 p-6 overflow-auto scrollbar-none">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6 bg-[#1E1E2E]/40">
                <TabsTrigger value="spells" className="font-['Space_Grotesk']">Glyph Spells</TabsTrigger>
                <TabsTrigger value="rituals" className="font-['Space_Grotesk']">Ritual Sequences</TabsTrigger>
                <TabsTrigger value="create" className="font-['Space_Grotesk']">Create Glyph</TabsTrigger>
                <TabsTrigger value="createRitual" className="font-['Space_Grotesk']">Create Ritual</TabsTrigger>
              </TabsList>
              
              {/* Glyph Spells Tab */}
              <TabsContent value="spells">
                <PetalPanel title="Glyph Codex" icon="🜹">
                  {isLoadingGlyphs ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {glyphs.map((glyph: Glyph) => (
                        <Card key={glyph.id} className="bg-[#1E1E2E] border-purple-500/30 p-4">
                          <div className="flex items-start mb-3">
                            <div className="relative w-10 h-10 flex items-center justify-center text-rose-400 mr-3">
                              <span className="text-2xl">{glyph.symbol}</span>
                              <div className="absolute inset-0 border border-current opacity-70 transform rotate-45"></div>
                              <div className="absolute inset-0 border border-current opacity-40 transform -rotate-45"></div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-['Space_Grotesk'] text-purple-400 text-lg">{glyph.name}</h3>
                              <div className="flex items-center mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${getStateClass(glyph.state)}`}>
                                  {glyph.state}
                                </span>
                                <span className="text-xs ml-2 text-gray-400">{glyph.system}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300 mt-2">{glyph.description}</p>
                          <div className="flex justify-end mt-4 space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-blue-400 border-blue-400/30 hover:bg-blue-400/10"
                              onClick={() => handleEditGlyph(glyph)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-rose-400 border-rose-400/30 hover:bg-rose-400/10"
                              onClick={() => handleDeleteGlyph(glyph.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                <line x1="10" y1="11" x2="10" y2="17"/>
                                <line x1="14" y1="11" x2="14" y2="17"/>
                              </svg>
                              Delete
                            </Button>
                          </div>
                        </Card>
                      ))}
                      
                      {glyphs.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-[#1E1E2E]/30 rounded-lg border border-purple-500/20">
                          <div className="w-16 h-16 mx-auto mb-4 opacity-30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/>
                              <line x1="8" y1="12" x2="16" y2="12"/>
                            </svg>
                          </div>
                          <h3 className="font-['Space_Grotesk'] text-xl mb-2 text-purple-400">No Glyphs Found</h3>
                          <p className="text-gray-400 max-w-md mx-auto">Create your first glyph to start building your symbolic language.</p>
                          <Button 
                            className="mt-4 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400"
                            onClick={() => {
                              setEditingItem(null);
                              glyphForm.reset();
                              setActiveTab('create');
                            }}
                          >
                            Create First Glyph
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </PetalPanel>
              </TabsContent>
              
              {/* Rituals Tab */}
              <TabsContent value="rituals">
                <PetalPanel title="Ritual Sequences" icon="🜇">
                  {isLoadingRituals ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {rituals.map((ritual: Ritual) => (
                        <Card key={ritual.id} className="bg-[#1E1E2E] border-blue-500/30 p-4">
                          <h3 className="font-['Space_Grotesk'] text-blue-400 text-lg mb-2">{ritual.name}</h3>
                          <p className="text-sm text-gray-300 mb-3">{ritual.description}</p>
                          
                          <div className="bg-[#0F0F1A]/60 rounded p-3 mb-4 border border-blue-500/10">
                            <h4 className="text-xs text-blue-400 font-['Space_Grotesk'] uppercase mb-2">Linked Glyphs</h4>
                            <div className="flex flex-wrap gap-2">
                              {ritual.glyphIds.map((glyphId, index) => {
                                const linkedGlyph = glyphs.find((g: Glyph) => g.id.toString() === glyphId);
                                return linkedGlyph ? (
                                  <div key={index} className="flex items-center bg-[#1E1E2E]/70 rounded-full px-2 py-1 text-sm">
                                    <span className="mr-1">{linkedGlyph.symbol}</span>
                                    <span className="text-xs text-gray-300">{linkedGlyph.name}</span>
                                  </div>
                                ) : (
                                  <div key={index} className="bg-[#1E1E2E]/70 rounded-full px-2 py-1 text-xs text-gray-400">
                                    Unknown Glyph
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          
                          <div className="bg-[#0F0F1A]/60 rounded p-3 mb-4 border border-blue-500/10 font-mono text-xs text-gray-300 h-20 overflow-y-auto scrollbar-none">
                            <pre>{ritual.code}</pre>
                          </div>
                          
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-green-400 border-green-400/30 hover:bg-green-400/10"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <polygon points="10 8 16 12 10 16 10 8"/>
                              </svg>
                              Execute
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-rose-400 border-rose-400/30 hover:bg-rose-400/10"
                              onClick={() => handleDeleteRitual(ritual.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                <line x1="10" y1="11" x2="10" y2="17"/>
                                <line x1="14" y1="11" x2="14" y2="17"/>
                              </svg>
                              Delete
                            </Button>
                          </div>
                        </Card>
                      ))}
                      
                      {rituals.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-[#1E1E2E]/30 rounded-lg border border-blue-500/20">
                          <div className="w-16 h-16 mx-auto mb-4 opacity-30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/>
                              <line x1="8" y1="12" x2="16" y2="12"/>
                            </svg>
                          </div>
                          <h3 className="font-['Space_Grotesk'] text-xl mb-2 text-blue-400">No Rituals Found</h3>
                          <p className="text-gray-400 max-w-md mx-auto">Create your first ritual sequence to start performing glyph operations.</p>
                          <Button 
                            className="mt-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400"
                            onClick={() => setActiveTab('createRitual')}
                          >
                            Create First Ritual
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </PetalPanel>
              </TabsContent>
              
              {/* Create Glyph Tab */}
              <TabsContent value="create">
                <PetalPanel title={editingItem ? "Edit Glyph" : "Create Glyph"} icon="🜆">
                  <Form {...glyphForm}>
                    <form onSubmit={glyphForm.handleSubmit(onGlyphSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                          control={glyphForm.control}
                          name="symbol"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-purple-400">Glyph Symbol</FormLabel>
                              <FormControl>
                                <Input placeholder="🜁" {...field} className="bg-[#0F0F1A]/80 border-purple-500/30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={glyphForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-purple-400">Glyph Name</FormLabel>
                              <FormControl>
                                <Input placeholder="BloomStellarConsole" {...field} className="bg-[#0F0F1A]/80 border-purple-500/30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={glyphForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-purple-400">Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe the purpose and function of this glyph..." 
                                {...field} 
                                className="bg-[#0F0F1A]/80 border-purple-500/30 min-h-[100px]" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                          control={glyphForm.control}
                          name="system"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-purple-400">System Domain</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-[#0F0F1A]/80 border-purple-500/30">
                                    <SelectValue placeholder="Select system" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[#1E1E2E] border-purple-500/30">
                                  <SelectItem value="MirrorBloom">MirrorBloom</SelectItem>
                                  <SelectItem value="SingularisPrime">SingularisPrime</SelectItem>
                                  <SelectItem value="Transatron">Transatron</SelectItem>
                                  <SelectItem value="GlyphEngine">GlyphEngine</SelectItem>
                                  <SelectItem value="CodexManager">CodexManager</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={glyphForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-purple-400">State</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-[#0F0F1A]/80 border-purple-500/30">
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[#1E1E2E] border-purple-500/30">
                                  <SelectItem value="Active">Active</SelectItem>
                                  <SelectItem value="Ready">Ready</SelectItem>
                                  <SelectItem value="Pending">Pending</SelectItem>
                                  <SelectItem value="Paused">Paused</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <Button 
                          type="button" 
                          variant="outline"
                          className="border-gray-500/30"
                          onClick={() => {
                            glyphForm.reset();
                            if (editingItem) setEditingItem(null);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400"
                          disabled={createGlyphMutation.isPending || updateGlyphMutation.isPending}
                        >
                          {(createGlyphMutation.isPending || updateGlyphMutation.isPending) ? (
                            <>
                              <div className="animate-spin h-4 w-4 border-2 border-purple-400 border-t-transparent rounded-full mr-2"></div>
                              {editingItem ? 'Updating...' : 'Creating...'}
                            </>
                          ) : (
                            <>{editingItem ? 'Update Glyph' : 'Create Glyph'}</>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </PetalPanel>
              </TabsContent>
              
              {/* Create Ritual Tab */}
              <TabsContent value="createRitual">
                <PetalPanel title="Create Ritual Sequence" icon="🜆">
                  <Form {...ritualForm}>
                    <form onSubmit={ritualForm.handleSubmit(onRitualSubmit)} className="space-y-6">
                      <FormField
                        control={ritualForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-400">Ritual Name</FormLabel>
                            <FormControl>
                              <Input placeholder="QuantumEntanglementRitual" {...field} className="bg-[#0F0F1A]/80 border-blue-500/30" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={ritualForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-400">Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe the purpose and function of this ritual..." 
                                {...field} 
                                className="bg-[#0F0F1A]/80 border-blue-500/30 min-h-[100px]" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={ritualForm.control}
                        name="glyphIds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-400">Select Glyphs</FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 bg-[#0F0F1A]/80 border border-blue-500/30 rounded-md p-3">
                              {glyphs.map((glyph: Glyph) => (
                                <div 
                                  key={glyph.id} 
                                  className={`
                                    flex items-center space-x-2 p-2 rounded-md cursor-pointer
                                    ${field.value.includes(glyph.id.toString()) 
                                      ? 'bg-blue-500/20 border border-blue-500/40' 
                                      : 'hover:bg-[#1E1E2E] border border-transparent'}
                                  `}
                                  onClick={() => {
                                    const glyphIdStr = glyph.id.toString();
                                    const currentIds = [...field.value];
                                    if (currentIds.includes(glyphIdStr)) {
                                      field.onChange(currentIds.filter(id => id !== glyphIdStr));
                                    } else {
                                      field.onChange([...currentIds, glyphIdStr]);
                                    }
                                  }}
                                >
                                  <div className="relative w-6 h-6 flex items-center justify-center text-rose-400">
                                    <span>{glyph.symbol}</span>
                                    <div className="absolute inset-0 border border-current opacity-70 transform rotate-45"></div>
                                    <div className="absolute inset-0 border border-current opacity-40 transform -rotate-45"></div>
                                  </div>
                                  <span className="text-sm">{glyph.name}</span>
                                </div>
                              ))}
                              
                              {glyphs.length === 0 && (
                                <div className="col-span-full text-center py-4 text-gray-400">
                                  No glyphs available. Create glyphs first.
                                </div>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={ritualForm.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-400">Ritual Code</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Initialize entanglement stream to Andromeda.
Activate QuditEntangleGrid.
Load AegisSeed-Δ42 from codex." 
                                {...field} 
                                className="bg-[#0F0F1A]/80 border-blue-500/30 min-h-[150px] font-mono" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end space-x-3">
                        <Button 
                          type="button" 
                          variant="outline"
                          className="border-gray-500/30"
                          onClick={() => ritualForm.reset()}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400"
                          disabled={createRitualMutation.isPending}
                        >
                          {createRitualMutation.isPending ? (
                            <>
                              <div className="animate-spin h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full mr-2"></div>
                              Creating...
                            </>
                          ) : (
                            'Create Ritual'
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </PetalPanel>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <InteractionFooter options={interactionOptions} />
    </div>
  );
};

export default Codex;
