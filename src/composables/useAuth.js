import { auth } from '@/assets/firebase'; // Ensure the path is correct
import { onAuthStateChanged } from 'firebase/auth';
import { onMounted, onUnmounted, ref } from 'vue';

export function useAuth() {
  const user = ref(null);

  let unsubscribe = null;

  onMounted(() => {
    console.log('Setting up Firebase auth listener');
    unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
      console.log('Auth state changed. Current user:', currentUser);
    });
  });

  onUnmounted(() => {
    console.log('Cleaning up Firebase auth listener');
    if (unsubscribe) {
      unsubscribe();
    }
  });

  return { user };
}