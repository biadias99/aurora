<template>
  <v-dialog max-width="500" :model-value="dialog" @update:model-value="cancel">
    <v-card
      :subtitle="`${isEditing ? 'Editing Activity' : 'Creating Activity'}`"
      :title="`${isEditing ? 'Edit an Activity' : 'Create an Activity'}`"
    >
      <template #text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="localRecord.name" label="Name" />
          </v-col>

          <v-col cols="12">
            <v-date-input
              v-model="localRecord.date"
              label="Date"
            />
          </v-col>
        </v-row>
      </template>

      <v-divider />

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancel" variant="plain" @click="cancel" />

        <v-spacer />

        <v-btn text="Save" @click="save" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { reactive, watch } from 'vue'

  const props = defineProps({
    dialog: {
      type: Boolean,
      required: true,
    },
    record: {
      type: Object,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
  })

  const emit = defineEmits(['update:dialog', 'save'])

  const localRecord = reactive({ ...props.record })

  watch(() => props.record, newVal => {
    Object.assign(localRecord, newVal)
  })

  function cancel () {
    localRecord.name = '';
    localRecord.date = '';
    emit('update:dialog', false)
  }

  function save () {
    emit('save', localRecord)
    cancel()
  }
</script>
