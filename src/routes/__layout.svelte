<script lang="ts">
	import '../app.css';
</script>

<main>
	<slot />
</main>

<style lang="postcss">
	:global(body) {
		font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
			Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
		background-color: hsl(226, 27%, 10%);
	}
</style>
