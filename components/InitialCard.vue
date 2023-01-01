<script lang="ts" setup>
import MazBtn from "maz-ui/components/MazBtn";
import MazIcon from "maz-ui/components/MazIcon";
import useImage from "@/composables/useImage";

const image = ref<File>();
const appImage = useImage();
const router = useRouter();

const onFileChanged = (event: Event) => {
	const target = event.target as HTMLInputElement;
	if (target && target.files) {
		image.value = target.files[0];
	}
};

const convertToPath = () => {
	if (image) return URL.createObjectURL(image.value as any);
};

const finalize = () => {
	appImage.setImage(image.value as any);

	router.push("/editimage");
};
</script>

<template>
	<div class="flex flex-col items-center justify-center max-w-[75%]" v-if="!image">
		<div class="bg-white h-3/6">
			<h1 class="text-3xl text-black">GERE IMAGENS DO FAMOSO MEME "BEM VINDO AO GIGANTE" TOTALMENTE GRÁTIS!</h1>
		</div>

		<div class="bg-white max-w-[50%] p-10">
			<ClientOnly>
				<div class="mb-3 w-96">
					<label for="formFile" class="form-label inline-block mb-2 text-gray-700">Selecione o rosto da pessoa</label>
					<input
						class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
						type="file"
						accept="image/png"
						@change="onFileChanged($event)"
						capture
					/>
					<label for="formFile" class="form-label inline-block mb-2 text-gray-700 mt-5">
						Obs: A imagem deve ser transparente! Caso não tenha, recomendo o site:
						<a href="https://www.remove.bg/" target="_blank" class="text-blue-500 underline">https://www.remove.bg/</a>
					</label>
				</div>
			</ClientOnly>
		</div>
	</div>

	<div class="flex flex-col items-center justify-center max-w-[50%]" v-else>
		<ClientOnly>
			<h1>Imagem escolhida:</h1>
			<img :src="convertToPath()" class="img-preview" />
			<MazBtn class="ml-auto mt-5" @click="finalize">
				<template #left-icon>
					<MazIcon name="check" path="/icons" />
				</template>
				Continuar
			</MazBtn>
		</ClientOnly>
	</div>
</template>

<style lang="scss" scoped>
.img-preview {
	width: auto;
	max-height: 50vh;
}
</style>
