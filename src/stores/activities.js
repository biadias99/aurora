import { defineStore } from 'pinia';
import { db } from '../plugins/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: [],
    loading: false,
  }),

  actions: {
    async getActivities () {
      this.loading = true;

      try {
        const q = query(collection(db, 'activities'));
        const querySnapshot = await getDocs(q);

        this.activities = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(this.activities)
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
