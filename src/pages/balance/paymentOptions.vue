<template>
  <div class="flex justify-center">
    <section class="p-4 lg:w-1/2 w-full">
      <div class="bg-white text-black rounded-lg shadow-lg p-6">
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">PAYOUT</h3>
          <q-icon name="close" class="cursor-pointer" />
        </div>

        <!-- Payment Option -->
        <div class="text-center my-4">
          <img
            src="/src/assets/paytm.png"
            alt="Paytm Logo"
            class="mx-auto w-32 mb-2"
          />
          <p class="text-red-500 font-bold">Further payment options</p>
        </div>

        <!-- Further Button -->
        <div class="text-center">
          <q-btn
          to="/balance/account-details"
            flat
            label="FURTHER 2/3"
            class="bg-green-700 text-white font-bold uppercase w-full py-3"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>