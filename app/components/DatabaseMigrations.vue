<template>
	<CodeViewer lang="php" :content="codePreview" />
</template>

<script setup lang="ts">
import pluralize from 'pluralize'
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
