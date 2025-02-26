<template>
  <div class="flex justify-center">
    <section class="p-4 lg:w-1/2 w-full">
      <div class="bg-white text-black rounded-lg shadow-lg p-6">
        <!-- Modal Header -->
        <div id="payment-form">
          <div class="q-mt-md q-mb-md text-negative" v-if="submissionError">
            <div id="card-errors" role="alert">{{ submissionError }}</div>
          </div>
          <div class="text-sm mb-4">
            <p class="font-bold">Important information</p>
            <ul class="list-disc pl-6 text-gray-700">
              <li>A deposit of less than 10 USD is not possible.</li>
            </ul>
          </div>
          <div class="mb-6">
            <label class="block font-bold mb-2" for="amount">Amount</label>
            <q-input
              filled
              type="number"
              v-model="amount"
              placeholder="10 USD"
              class="w-full bg-gray-100 text-lg"
            />
          </div>
          <q-field
            label="Card Number"
            stack-label
            class="q-mb-md"
            :error-message="errors.cardNumber"
            :error="!isCardNumberValid"
          >
            <template v-slot:control>
              <div
                class="self-center full-width no-outline"
                ref="cardNumberRef"
              ></div>
            </template>
          </q-field>

          <div class="row q-col-gutter-lg">
            <div class="col-6">
              <q-field
                label="Card Expiry"
                stack-label
                class="q-mb-md"
                :error-message="errors.cardExpiry"
                :error="!isCardExpiryValid"
              >
                <template v-slot:control>
                  <div
                    class="self-center full-width no-outline"
                    ref="cardExpiryRef"
                  ></div>
                </template>
              </q-field>
            </div>
            <div class="col-6">
              <q-field
                label="Card CVC"
                stack-label
                class="q-mb-md"
                :error-message="errors.cardCvc"
                :error="!isCardCvcValid"
              >
                <template v-slot:control>
                  <div
                    class="self-center full-width no-outline"
                    ref="cardCvcRef"
                  ></div>
                </template>
              </q-field>
            </div>
          </div>

          <q-btn
            unelevated
            color="accent"
            label="Make Payment"
            :loading="loading"
            @click="submitForm"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js/pure";
import { usePaymentStore } from "../../stores/payment";

export default {
  props: {
    data: { type: Object, required: false, default: () => ({}) },
  },
  setup(_, { emit }) {
    const paymentStore = usePaymentStore();
    const amount = ref(10);
    const loading = ref(false);
    const stripe = ref(null);
    const elements = ref(null);
    const card = ref({ cardNumber: null, cardExpiry: null, cardCvc: null });
    const errors = ref({ cardNumber: "", cardExpiry: "", cardCvc: "" });
    const submissionError = ref(null);

    const cardNumberRef = ref(null);
    const cardExpiryRef = ref(null);
    const cardCvcRef = ref(null);

    const isCardNumberValid = computed(() => errors.value.cardNumber === "");
    const isCardExpiryValid = computed(() => errors.value.cardExpiry === "");
    const isCardCvcValid = computed(() => errors.value.cardCvc === "");

    const submitForm = async () => {
      try {
        loading.value = true;
        submissionError.value = null;

        const { token, error } = await stripe.value.createToken(
          card.value.cardNumber
        );

        if (error) {
          submissionError.value = error.message;
          emit("failed", error);
        } else {
          const userId = localStorage.getItem("userId");
          await paymentStore.createPayment({
            userId: userId,
            amount: amount.value,
            nonce: token.id,
          });

          // Reset form after success
          resetForm();
          amount.value = ""; // Clear amount field
          emit("success", token);
        }
      } catch (error) {
        submissionError.value =
          "An error occurred while processing the payment.";
        emit("failed", error);
      } finally {
        loading.value = false;
      }
    };

    const resetForm = () => {
      Object.values(card.value).forEach((element) => element.clear());
      amount.value = "";
    };

    const updated = (e) => {
      const elementType = e.elementType;
      errors.value[elementType] = e.error ? e.error.message : "";
    };

    onMounted(async () => {
      stripe.value = await loadStripe(
        "pk_test_51Prp1mP6sejyhIpTnsDKkuhPiJK9soE8rTmp39GNeoWaIryjhsgJ2dTE4rbBOI492k94e7luhQCd7frfQPwRkHv000PR4g4HU5"
      );
      elements.value = stripe.value.elements();

      const style = {
        base: {
          fontFamily: "Roboto, sans-serif",
          "::placeholder": { color: "#CFD7E0" },
        },
      };
      const cardElements = {
        cardNumber: cardNumberRef,
        cardExpiry: cardExpiryRef,
        cardCvc: cardCvcRef,
      };

      Object.keys(cardElements).forEach((key) => {
        card.value[key] = elements.value.create(key, { style });
        card.value[key].mount(cardElements[key].value);
        card.value[key].addEventListener("change", updated);
      });
    });

    return {
      loading,
      errors,
      submissionError,
      isCardNumberValid,
      isCardExpiryValid,
      isCardCvcValid,
      submitForm,
      cardNumberRef,
      cardExpiryRef,
      cardCvcRef,
      amount,
    };
  },
};
</script>

<style scoped>
.StripeElement--invalid {
  border-color: transparent;
}
</style>
