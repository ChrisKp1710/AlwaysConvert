// types.ts (o dove hai definito l'interfaccia Action)
export interface Action {
  file_name: string;
  file_size: number;
  from: string;
  to: string | null;
  file_type: string;
  file: File;
  is_converted: boolean;
  is_converting: boolean;
  is_error: boolean;
  // Assicurati che url e output siano string, se è quello che ti aspetti
  url?: string;    // o string | null
  output?: string; // o string | null
}
