<template>
  <q-layout>
    <q-page-container
      class="bg-cover bg-center"
      style="
        background-image: url('/src/assets/Wallpapper_2.jpg');
        min-height: 100vh;
      "
    >
      <q-page class="flex justify-center items-center min-h-screen px-5">
        <div class="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">CASINO OF HINDUISM</h1>
          </div>
          <p class="text-center text-2xl font-bold">Enter OTP</p>
          <p class="text-center text-sm font-medium text-gray-400">
            Please enter the 6-digit OTP sent to your email
          </p>
          <q-form @submit.prevent="handleSubmit" class="space-y-3 py-5">
            <div class="grid grid-cols-6 gap-5">
              <q-input
                v-for="(digit, index) in otp"
                :key="index"
                v-model="otp[index]"
                mask="###"
                maxlength="1"
                outlined
                bg-color="white"
                input-class="text-center text-dark"
                class="w-12 h-12 text-xl round-6"
                @input="focusNext(index)"
                :data-index="index"
              />
            </div>
            <div class="pt-5">
              <q-btn
                class="round-6 text-weight-bold q-py-md drop-shadow text-nowrap font-16 w-full"
                no-caps
                label="Verify OTP"
                type="submit"
                color="primary"
              />
            </div>
          </q-form>
          <div class="text-center mt-4">
            <p class="text-gray-600">
              <a href="/login" class="text-green-600 font-bold"
                >Remember Password?</a
              >
            </p>
          </div>
          <div class="text-center mt-4">
            <p class="text-gray-600">
              Don't have an account?
              <a href="/register/step-one" class="text-green-600 font-bold"
                >Register</a
              >
            </p>
          </div>
        </div>
        <Footer />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, nextTick ,onMounted} from "vue";
import { Notify } from "quasar";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import Footer from "../../components/footer.vue";
export default {
  components: {
    Footer,
  },
  name: "OtpPage",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const otp = ref(["", "", "", "", "", ""]); // Array for each digit of the OTP
    onMounted(()=>{
      authStore.resetState()
    })
    const focusNext = (index) => {
      if (otp.value[index].length === 1 && index < otp.value.length - 1) {
        nextTick(() => {
          const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
          if (nextInput) nextInput.focus();
        });
      }
    };

    const handleSubmit = async () => {
      const otpCode = otp.value.join("");
      const email=localStorage.getItem('email')
      if (otpCode.length === 6) {
        await authStore.verifyOtp({contact:email ,otp: otpCode });
        Notify.create({
          type: !authStore.error ? "positive" : "negative",
          message: !authStore.error ? "OTP verified!" : authStore.error,
          position: "top",
          timeout: 3000,
        });
        if (!authStore.error) {
          localStorage.setItem('otp',otpCode)
          router.push("/reset-password"); // Redirect on successful verification
        }
      } else {
        Notify.create({
          type: "negative",
          message: "Please enter all 6 digits of the OTP",
          position: "top",
          timeout: 3000,
        });
      }
    };
    return {
      otp,
      focusNext,
      handleSubmit,
    };
  },
};
</script>
<style scoped>
footer {
  font-size: 0.875rem; /* Tailwind text-sm */
}
</style>