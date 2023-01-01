<script lang="ts" setup>
useHead({
	title: "Vascofy - Bem vindo ao gigante!",
	meta: [
		{
			name: "description",
			content: "Gerador de imagens para o meme do Vasco da Gama",
		},
	],
});
</script>

<template>
	<div>
		<LayoutHeader />
		<main>
			<RouterView />
		</main>
		<LayoutFooter />
	</div>
</template>

<style lang="scss">
$main-size: calc(100vh - 140px);

body {
	max-height: 100vh;
}

main {
	min-height: $main-size;
	max-height: $main-size;
	overflow-y: scroll;
	overflow-x: hidden;
	margin-top: 70px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
