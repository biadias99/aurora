import { defineStore } from 'pinia';
import { db } from '../plugins/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { formatStartEndDate } from '../composables/formatStartEndDate';

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: [],
    dayActivities: [],
    completedDayActivities: [],
    monthlyActivities: [],
    loading: false,
    today: new Date(),
    selectedDate: new Date(),
  }),

  actions: {
    setSelectedDate (date) {
      this.selectedDate = date;
    },

    getTodayFormattedDate () {
      return formatStartEndDate(this.today);
    },

    getSelectedFormattedDate () {
      return formatStartEndDate(this.selectedDate);
    },

    async getActivities () {
      this.loading = true;

      try {
        const q = query(collection(db, 'activities'));
        const querySnapshot = await getDocs(q);

        this.activities = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async getDayActivities ({ startOfDay, endOfDay }, daily = false) {
      this.loading = true;
      try {
        const q = query(
          collection(db, 'activities'),
          where('date', '>=', startOfDay),
          where('date', '<', endOfDay)
        );
        const querySnapshot = await getDocs(q);

        this.dayActivities = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        this.completedDayActivities = this.dayActivities.filter(activity => activity.done === true);

        if (daily) this.monthlyActivities = this.dayActivities;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async getMonthlyActivities ({ startOfDay, endOfDay }) {
      this.loading = true;

      try {
        const q = query(
          collection(db, 'activities'),
          where('date', '>=', startOfDay),
          where('date', '<', endOfDay)
        );
        const querySnapshot = await getDocs(q);

        this.monthlyActivities = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async createActivity (activity) {
      try {
        await addDoc(collection(db, 'activities'), activity);
        await this.getDayActivities(this.getTodayFormattedDate());
        await this.getMonthlyActivities(this.getSelectedFormattedDate());
      } catch (error) {
        console.error(error);
      }
    },

    async updateActivity (id, done) {
      try {
        const activityRef = doc(db, 'activities', id);
        const formattedDate = formatStartEndDate(this.today);

        await updateDoc(activityRef, { done });
        await this.getDayActivities(formattedDate);
        await this.getMonthlyActivities(this.getSelectedFormattedDate());
      } catch (error) {
        console.error(error);
      }
    },

    async updateWholeActivity (activity) {
      try {
        const activityRef = doc(db, 'activities', activity.id);

        await updateDoc(activityRef, { name: activity.name, done: activity.done, date: activity.date });
        await this.getDayActivities(this.getTodayFormattedDate());
        await this.getMonthlyActivities(this.getSelectedFormattedDate());
      } catch (error) {
        console.error(error);
      }
    },

    async deleteActivity (id) {
      try {
        const activityRef = doc(db, 'activities', id);

        await deleteDoc(activityRef, id);
        await this.getDayActivities(this.getTodayFormattedDate());
        await this.getMonthlyActivities(this.getSelectedFormattedDate());
      } catch (error) {
        console.error(error);
      }
    },
  },
});
