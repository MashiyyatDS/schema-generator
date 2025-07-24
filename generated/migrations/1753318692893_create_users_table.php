<?php

use IlluminateDatabaseMigrationsMigration;
use IlluminateDatabaseSchemaBlueprint;
use IlluminateSupportFacadesSchema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); 
			$table->string('first name')->nullable();
			$table->string('middle name')->nullable();
			$table->string('last name')->nullable();
			$table->string('contact')->nullable();
			$table->string('email')->nullable();
			$table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop('users');
    }
};