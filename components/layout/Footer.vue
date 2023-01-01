<template>
	<footer class="relative border-t bg-black w-full h-[70px] flex items-center">
		<div class="absolute inset-x-0 flex items-center justify-center hide-if-mobile">
			<nuxt-img src="/logo.png" width="32" height="32" />
		</div>
		<div class="mx-auto sm:px-6 lg:px-8 px-4 w-full">
			<div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
				<div class="flex flex-col-reverse items-center gap-3 sm:flex-row">
					<span class="text-sm text-gray-300">© {{ new Date().getFullYear() }} Nuxt - Lucas Gardini</span>
				</div>
			</div>
		</div>
	</footer>
</template>

<style lang="scss">
footer {
	z-index: 9999;
}
</style>
