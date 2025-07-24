<template>
	<div class="border-1 border-gray-800 rounded-lg p-5">
		<UFormField v-for="(field, key) in modelFields.fields" :key="key" :label="convertStringCases(field).regular" class="mb-3">
			<UInput v-model="columns[field]" />
		</UFormField>

		<CodeViewer lang="php" :content="`\n${codePreview}`" />
	</div>
</template>

<script setup lang="ts">
import pluralize from 'pluralize'

const columns = reactive<{ [key: string]: any }>({})

const modelFields = defineModel<{ name: string; fields: string[] }>({ required: true })

const codePreview = computed(
	() => `<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('${convertStringCases(pluralize(modelFields.value.name)).snake}', function (Blueprint $table) {
            $table->id(); 
			${modelFields.value.fields.map((field) => `$table->string('${field}')->nullable();\n\t\t\t`).join('')}$table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop('${convertStringCases(pluralize(modelFields.value.name)).snake}');
    }
};`
)

defineExpose({
	codePreview,
})
</script>
