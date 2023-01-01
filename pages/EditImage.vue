<script lang="ts" setup>
import MazBtn from "maz-ui/components/MazBtn";
import MazIcon from "maz-ui/components/MazIcon";
import MazDialog from "maz-ui/components/MazDialog";
import MazInput from "maz-ui/components/MazInput";
import useImage from "@/composables/useImage";

const { image } = useImage();

const jogador = reactive({
	nome: "",
	posicao: "ATACANTE",
});
const isOpen = ref<boolean>(true);

const draggable = ref<HTMLElement>();
const position = reactive({
	isDragging: false,
	currentX: 0,
	currentY: 0,
	initialX: 200,
	initialY: 200,
	xOffset: 0,
	yOffset: 0,
	top: 0,
	left: 0,
	height: 1,
});

const startDragging = (event: MouseEvent) => {
	console.log("start dragging");
	event.preventDefault();

	position.initialX = event.clientX - position.xOffset;
	position.initialY = event.clientY - position.yOffset;

	if (draggable.value && event.target) {
		if (event.target === draggable.value) {
			position.isDragging = true;
		}
	}
};

const drag = (event: MouseEvent) => {
	event.preventDefault();

	if (position.isDragging) {
		console.log("dragging");
		position.currentX = event.clientX - position.initialX;
		position.currentY = event.clientY - position.initialY;

		position.xOffset = position.currentX;
		position.yOffset = position.currentY;

		position.top = position.currentY;
		position.left = position.currentX;
	}
};

const stopDragging = () => {
	console.log("stop dragging");

	if (!position.isDragging) {
		isOpen.value = true;
	}

	position.isDragging = false;
};

const resize = (event: WheelEvent) => {
	console.log(event.deltaY);

	if (event.deltaY > 0) {
		position.height -= 0.1;
	} else {
		position.height += 0.1;
	}
};

const convertToPath = () => {
	if (image) return URL.createObjectURL(image.value as any);
};

onMounted(() => {
	document.addEventListener("mouseup", stopDragging);
	document.addEventListener("mousemove", drag);
});

onUnmounted(() => {
	document.removeEventListener("mouseup", stopDragging);
	document.removeEventListener("mousemove", drag);
});
</script>

<template>
	<ClientOnly v-if="image">
		<MazDialog v-model="isOpen" title="Quem foi contratado?" style="z-index: 999999999">
			<MazInput v-model="jogador.nome" label="Nome" />

			<MazInput v-model="jogador.posicao" label="Posição" class="mt-10" />

			<p class="mt-5">Problemas no tamanho da imagem?</p>
			<p class="mt-5">
				Redimensione o tamanho da janela do seu navegador até encontrar o tamanho ideal, depois, é só tirar um print da imagem e salvar!
				<br />Dica de ferramenta:
				<a href="https://app.prntscr.com/pt-br/index.html" target="_blank" class="text-blue-500 underline">lightshot</a>
			</p>
			<template #footer>
				<MazBtn @click="isOpen = false"> Confirm </MazBtn>
			</template>
		</MazDialog>

		<img src="/template/fundo.png" class="meme-img background z-0" />

		<img
			:src="convertToPath()"
			class="img-preview cursor-move"
			ref="draggable"
			:style="{ position: 'absolute', top: position.top + 'px', left: position.left + 'px', zIndex: 1, transform: `scale(${position.height})` }"
			@mousedown="startDragging"
			@wheel="resize"
		/>

		<div class="meme-text">
			<h1>{{ jogador.nome }}</h1>
			<h1>{{ jogador.posicao }}</h1>
		</div>

		<img src="/template/uniforme.png" class="meme-img background" style="z-index: 2" />
	</ClientOnly>

	<ClientOnly v-else>
		<div class="flex flex-col items-center justify-center">
			<p>Erro</p>
			<MazBtn class="ml-auto mt-5" @click="$router.push('/')">
				<template #left-icon>
					<MazIcon name="arrow-left" path="/icons" />
				</template>
				Voltar
			</MazBtn>
		</div>
	</ClientOnly>
</template>

<style lang="scss" scoped>
$main-size: calc(100vh - 140px);

.meme-img {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	pointer-events: none;
}

.meme-text {
	position: absolute;
	top: 55%;
	left: 70%;
	transform: translate(-50%, -50%);
	font-family: "Long Shot";
	font-size: 6rem;
	color: white;
	text-align: center;
	pointer-events: none;

	@media (max-width: 1400px) {
		font-size: 3rem;
	}

	@media (max-width: 1600px) {
		font-size: 4rem;
	}
}

.background {
	width: 100%;
	height: $main-size;
}

.img-preview {
	height: calc($main-size * 0.8);
}
</style>
