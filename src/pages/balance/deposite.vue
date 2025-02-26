<template>
<div class="flex justify-center">
    <section class="p-4 lg:w-1/2 w-full">
    <div class="bg-white text-black rounded-lg shadow-lg p-6">
      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold">DEPOSIT MONEY</h3>
        <q-icon name="close" class="cursor-pointer" />
      </div>

      <!-- Instructions -->
      <p class="text-sm mb-4">
        Please note that you should only use payment methods that are registered
        under your name.
      </p>

      <!-- Amount Input -->
      <div class="mb-6">
        <label for="amount" class="block font-bold mb-2">Amount</label>
        <input
          id="amount"
          type="text"
          value="1`000 ₹"
          class="w-full p-2 border rounded-md"
          disabled
        />
      </div>

      <!-- Payment Form -->
      <div class="mb-4">
        <form>
          <!-- Payment Methods -->
          <div class="flex items-center gap-4 mb-4">
            <label>
              <input type="radio" name="paymentMethod" class="mr-2" />
              Debit or credit card
            </label>
            <label>
              <input type="radio" name="paymentMethod" class="mr-2" />
              All major cards accepted
            </label>
          </div>

          <!-- Card Details -->
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label for="cardNumber" class="block text-sm font-bold mb-1"
                >Card number</label
              >
              <input
                id="cardNumber"
                type="text"
                placeholder="Card number"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label for="expiryDate" class="block text-sm font-bold mb-1"
                >Expiry date</label
              >
              <input
                id="expiryDate"
                type="text"
                placeholder="MM / YY"
                class="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label for="cardHolder" class="block text-sm font-bold mb-1"
                >Cardholder name</label
              >
              <input
                id="cardHolder"
                type="text"
                placeholder="Cardholder name"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label for="cvc" class="block text-sm font-bold mb-1"
                >CVC / CVV</label
              >
              <input
                id="cvc"
                type="text"
                placeholder="CVC / CVV"
                class="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <!-- Alternative Payment -->
          <div class="mb-4">
            <label>
              <input type="radio" name="paymentMethod" class="mr-2" />
              PayPal
            </label>
          </div>

          <!-- Currency Selector -->
          <div class="mb-4">
            <label for="currency" class="block text-sm font-bold mb-2"
              >Card Currency</label
            >
            <select id="currency" class="w-full p-2 border rounded-md">
              <option>INR</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>

          <!-- Verify Button -->
          <div class="text-center">
            <q-btn
              flat
              label="Verify payment Method"
              class="bg-blue-600 text-white font-bold uppercase w-full py-3"
            />
          </div>
        </form>
      </div>

      <!-- Agreement -->
      <p class="text-xs text-center mt-4">
        You agree to authorize the use of your card for future payments.
      </p>
    </div>
  </section>
</div>
</template>
  