import { auth } from '@/assets/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { onMounted, onUnmounted, ref } from 'vue';

const user = ref(null);

export function getUser() {
  let unsubscribe = null;

  const initializeAuthListener = () => {
    if (!unsubscribe) {
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
        console.log('Auth state changed. Current user:', currentUser);
      });
    }
  };

  onMounted(() => {
    initializeAuthListener();
  });

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  return { user };
}

export { user };
