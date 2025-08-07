<template>
	<div class="border-1 border-gray-800 rounded-lg p-5">
		<div class="grid grid-cols-12 gap-1">
			<div class="col-span-8">
				<UFormField label="Model Name">
					<UInput
						v-model="modelFields.name"
						placeholder="Enter your model name"
						class="w-full"
						size="lg" />
				</UFormField>
			</div>

			<div class="col-span-4">
				<UFormField label="Model field name">
					<div class="flex gap-1">
						<UInput
							v-model="fieldName"
							placeholder="Enter your model name"
							class="w-full"
							size="lg"
							@keyup.enter="addField" />

						<UButton label="Add" @click="addField" />
					</div>
				</UFormField>
			</div>

			<div
				v-for="(field, key) in modelFields.fields"
				:key="key"
				class="col-span-12 flex gap-1">
				<UButton
					icon="material-symbols:delete-forever"
					variant="ghost"
					class="hover:cursor-pointer"
					@click="modelFields.fields.splice(key, 1)" />
				<UKbd size="lg" class="self-center">{{ field }}</UKbd>
			</div>
		</div>

		<CodeViewer v-if="modelFields.name" :content="`\n${codePreview}`" lang="php" />
	</div>
</template>

<script setup lang="ts">
const modelFields = defineModel<{ name: string; fields: string[] }>({ required: true })

const codePreview = computed(
	() => `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Relations\\MorphMany;
use Illuminate\\Database\\Eloquent\\SoftDeletes;
use Illuminate\\Database\\Eloquent\\Builder;
use OwenIt\\Auditing\\Contracts\\Auditable;
use Illuminate\\Database\\Eloquent\\Model;

class ${convertStringCases(modelFields.value.name).pascal} extends Model implements Auditable
{
    use HasFactory, SoftDeletes;
    use \\OwenIt\\Auditing\\Auditable;

    public function scopeSearch(Builder $query, ?string $search): void
    {
        $query->where('id', $search)
			${modelFields.value.fields
				.map(
					(field) =>
						`->orWhere('${
							convertStringCases(field).snake
						}', 'like', "%{$search}%")\n\t\t\t`
				)
				.join('')}->orWhere('created_at', 'like', "%{$search}%")
            ->orWhere('updated_at', 'like', "%{$search}%");
    }

    public function logs(): MorphMany
    {
        return $this->morphMany(Audit::class, 'auditable');
    }
}`
)

const fieldName = ref('')
function addField() {
	modelFields.value.fields.push(fieldName.value)

	fieldName.value = ''
}

defineExpose({
	codePreview,
})
</script>
