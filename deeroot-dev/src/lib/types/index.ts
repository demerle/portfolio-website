export interface PianoKeyConfig {
	id: number;
	type: 'white' | 'black';
	basePosition: [number, number, number];
	floatOffset: number;
	floatSpeed: number;
}

export interface CodeBlockConfig {
	content: string;
	position: [number, number, number];
	rotation: [number, number, number];
	color: string;
	fontSize: number;
}

export interface MousePosition {
	x: number;
	y: number;
}
