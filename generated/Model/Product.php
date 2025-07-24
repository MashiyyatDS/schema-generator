<?php

namespace AppModels;

use IlluminateDatabaseEloquentFactoriesHasFactory;
use IlluminateDatabaseEloquentRelationsMorphMany;
use IlluminateDatabaseEloquentSoftDeletes;
use IlluminateDatabaseEloquentBuilder;
use OwenItAuditingContractsAuditable;
use IlluminateDatabaseEloquentModel;

class Product extends Model implements Auditable
{
    use HasFactory, SoftDeletes;
    use OwenItAuditingAuditable;

    public function scopeSearch(Builder $query, ?string $search): void
    {
        $query->where('id', $search)
			->orWhere('name', 'like', "%{$search}%")
			->orWhere('barcode', 'like', "%{$search}%")
			->orWhere('srp', 'like', "%{$search}%")
			->orWhere('status', 'like', "%{$search}%")
			->orWhere('value_added_tax', 'like', "%{$search}%")
			->orWhere('created_at', 'like', "%{$search}%")
            ->orWhere('updated_at', 'like', "%{$search}%");
    }

    public function logs(): MorphMany
    {
        return $this->morphMany(Audit::class, 'auditable');
    }
}