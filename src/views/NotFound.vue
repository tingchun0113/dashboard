<template>
  <div class="bg-gradient-to-r from-red-300 to-red-200">
    <div
      class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center"
    >
      <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
        <div class="border-t border-gray-200 text-center pt-8">
          <h1 class="text-9xl font-bold text-red-400">404</h1>
          <h1 class="text-6xl font-medium py-8">Oops! Page not found</h1>
          <p class="text-2xl pb-8 px-12 font-medium">
            Oops! The page you are looking for does not exist. It might have
            been moved or deleted.
          </p>
          <button
            @click="$router.push('Home')"
            class="bg-gradient-to-r from-red-400 to-red-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md"
          >
            HOME
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
