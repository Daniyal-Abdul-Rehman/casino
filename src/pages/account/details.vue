<template>
  <q-page-container>
    <q-page class="bg-gray-100">
      <!-- Form Section -->
      <div class="max-w-3xl mx-auto mt-6 bg-white p-6 shadow-md rounded-md">
        <q-tabs
          v-model="tab"
          class="text-green-600"
          align="justify"
          active-color="green"
          indicator-color="green"
        >
          <q-tab name="personal-data" label="Personal Data" />
          <!-- <q-tab name="bank-details" label="Bank Details" /> -->
          <q-tab name="account-details" label="Account Details" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <!-- Personal Data -->
          <q-tab-panel name="personal-data">
            <form @submit.prevent="onSubmit">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <q-input filled label="First Name" v-model="form.firstName" />
                <q-input filled label="Last Name" v-model="form.surname" />
                <q-input
                  filled
                  label="Date of Birth"
                  placeholder="DD/MM/YYYY"
                  v-model="form.dateOfBirth"
                />
                <q-input filled label="Street Name" v-model="form.streetName" />
                <q-input filled label="Phone Number" v-model="form.phone" />
                <q-input
                  filled
                  label="Email"
                  type="email"
                  v-model="form.email"
                />
              </div>
              <div class="text-center mt-6">
                <q-btn
                  label="Save"
                  type="submit"
                  color="blue"
                  push
                  class="rounded-lg"
                />
              </div>
            </form>
          </q-tab-panel>

          <!-- Bank Details -->
          <!-- <q-tab-panel name="bank-details">
            <form @submit.prevent="onSubmit">
              <q-input
                filled
                label="Owner of the Bank Account"
                v-model="form.bankOwner"
                class="mt-4"
              />
              <q-input
                filled
                label="IBAN"
                placeholder="Enter your IBAN"
                v-model="form.iban"
                class="mt-4"
              />
              <p class="text-sm text-gray-500 mt-2">
                Bank details cannot be changed once entered. For updates,
                contact:
                <span class="text-blue-500"
                  >gamesafe@casino-of-hinduism.com</span
                >
              </p>
              <div class="text-center mt-6">
                <q-btn
                  label="Save"
                  type="submit"
                  color="blue"
                  push
                  class="rounded-lg"
                />
              </div>
            </form>
          </q-tab-panel> -->

          <!-- Account Details -->
          <q-tab-panel name="account-details">
            <form @submit.prevent="onSubmit">
              <q-input
                filled
                label="Player Name"
                v-model="form.playerName"
                class="mt-4"
              />
              <q-input
                filled
                label="New Password"
                type="password"
                v-model="form.newPassword"
                class="mt-4"
              />
              <q-input
                filled
                label="Repeat Password"
                type="password"
                v-model="form.repeatPassword"
                class="mt-4"
              />
              <div class="text-center mt-6">
                <q-btn
                  label="Save"
                  type="submit"
                  color="blue"
                  push
                  class="rounded-lg"
                />
              </div>
            </form>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "src/stores/user";

export default {
  setup() {
    // ** Reactive state
    const profileStore = useUserStore();
    const tab = ref("personal-data");
    const form = ref({
      firstName: "",
      surname: "",
      dateOfBirth: "",
      streetName: "",
      phone: "",
      email: "",
      bankOwner: "",
      iban: "",
      playerName: "",
      newPassword: "",
      repeatPassword: "",
    });
    onMounted(async () => {
      const userid = localStorage.getItem("userId");
      await profileStore.getUserById(userid);
      (form.value.firstName = profileStore.user.firstName),
        (form.value.surname = profileStore.user.surname);
      form.value.dateOfBirth = profileStore.user.dateOfBirth;
      form.value.email = profileStore.user.email;
      form.value.streetName = profileStore.user.streetName;
      form.value.phone = profileStore.user.phone;
      form.value.playerName=profileStore.user.playerName
    });
    // ** Methods
    const onSubmit = async () => {
      const userid = localStorage.getItem("userId");
      const userData = {
        dateOfBirth: form.value.dateOfBirth,
        firstName: form.value.firstName,
        surname: form.value.surname,
        email: form.value.email,
        phone: form.value.phone,
      };

      await profileStore.updateUserById(userid, userData);

      var message = form.value.description;
      if (message.trim() !== "") {
        // Step 1: Remove banned words  f
        // message = removeBannedWords(message, bannedWords.value);

        // Step 2: Check sentiment
        const sentimentAnalysis = checkSentiment(message);

        if (sentimentAnalysis) {
          // Negative sentiment detected
          $q.dialog({
            title: "Alert",
            html: true,
            message:
              "<span class='text-red text-weight-medium'>The description added was formulated incomprehensibly / incorrectly.</span>",
          });
        } else {
          // Step 3: Check spam
          // conformationDialog.value = true;
        }
      }
    };

    // Return the reactive state and methods to the template
    return {
      tab,
      form,
      onSubmit,
    };
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
