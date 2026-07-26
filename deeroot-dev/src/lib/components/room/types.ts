// Room Scene Types

export interface RoomConfig {
	width: number;
	depth: number;
	height: number;
	wallColor: string;
	floorColor: string;
	ceilingColor: string;
}

export interface FurnitureConfig {
	desk: {
		width: number;
		depth: number;
		height: number;
		color: string;
		position: [number, number, number];
	};
	chair: {
		seatHeight: number;
		color: string;
		position: [number, number, number];
	};
}

export interface ComputerConfig {
	monitor: {
		width: number;
		height: number;
		depth: number;
		position: [number, number, number];
		rotation: [number, number, number];
		screenGlowColor: string;
		screenGlowIntensity: number;
	};
	keyboard: {
		width: number;
		depth: number;
		position: [number, number, number];
	};
	mouse: {
		position: [number, number, number];
	};
	pcTower: {
		position: [number, number, number];
		hasRGB: boolean;
	};
}

export interface CharacterConfig {
	position: [number, number, number];
	rotation: [number, number, number];
	scale: number;
	colors: {
		skin: string;
		shirt: string;
		pants: string;
		hair: string;
	};
}

export interface LightingConfig {
	ambient: {
		color: string;
		intensity: number;
	};
	screenGlow: {
		color: string;
		intensity: number;
		distance: number;
	};
	accent: {
		color: string;
		intensity: number;
		position: [number, number, number];
	};
}

export interface RoomSceneProps {
	room: RoomConfig;
	furniture: FurnitureConfig;
	computer: ComputerConfig;
	character: CharacterConfig;
	lighting: LightingConfig;
}

// Default configurations
export const defaultRoomConfig: RoomConfig = {
	width: 12,
	depth: 10,
	height: 8,
	wallColor: '#2a2a3e',
	floorColor: '#3d2817',
	ceilingColor: '#1a1a2e'
};

export const defaultFurnitureConfig: FurnitureConfig = {
	desk: {
		width: 3,
		depth: 1.5,
		height: 0.1,
		color: '#5c3d1e',
		position: [0, 1.5, -2]
	},
	chair: {
		seatHeight: 0.8,
		color: '#1a1a2e',
		position: [0, 0, -0.5]
	}
};

export const defaultComputerConfig: ComputerConfig = {
	monitor: {
		width: 1.2,
		height: 0.7,
		depth: 0.05,
		position: [0, 2.1, -2.3],
		rotation: [0, -0.3, 0], // Angled 30° toward camera
		screenGlowColor: '#4a90d9',
		screenGlowIntensity: 2
	},
	keyboard: {
		width: 0.8,
		depth: 0.3,
		position: [0, 1.55, -1.5]
	},
	mouse: {
		position: [0.6, 1.55, -1.5]
	},
	pcTower: {
		position: [2, 0.5, -2],
		hasRGB: true
	}
};

export const defaultCharacterConfig: CharacterConfig = {
	position: [0, 0.8, -0.5],
	rotation: [0, -0.3, 0], // Facing monitor
	scale: 1,
	colors: {
		skin: '#d4a574',
		shirt: '#2d3436',
		pants: '#2c3e50',
		hair: '#1a1a1a'
	}
};

export const defaultLightingConfig: LightingConfig = {
	ambient: {
		color: '#6b4c9a',
		intensity: 0.3
	},
	screenGlow: {
		color: '#4a90d9',
		intensity: 1.5,
		distance: 5
	},
	accent: {
		color: '#ff6b9d',
		intensity: 0.5,
		position: [4, 4, 4]
	}
};
