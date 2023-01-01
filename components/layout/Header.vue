<template>
	<header class="fixed top-0 border-t bg-black w-full h-[70px] flex items-center justify-center">
		<div class="mx-auto sm:px-6 lg:px-8 px-4 w-full cursor-pointer" @click="$router.push('/')">
			<p class="text-5xl text-gray-300 mt-2">VASCOFY</p>
		</div>
	</header>
</template>

<style lang="scss">
header {
	font-family: "Long Shot";
	z-index: 9999;
}
</style>
