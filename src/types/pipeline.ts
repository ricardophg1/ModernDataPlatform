export interface NodeConfig {
  name?: string;
  source?: string;
  query?: string;
  transformType?: string;
  code?: string;
  destinationType?: string;
  tableName?: string;
  writeMode?: string;
}

export interface PipelineNodeData {
  id: string;
  type: 'source' | 'transform' | 'destination';
  name: string;
  config: NodeConfig;
  position: { x: number; y: number };
}

export interface Connection {
  from: string;
  to: string;
}

