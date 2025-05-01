<?php

namespace App\Http\Requests;

use App\Enums\EngagementType;
use App\Models\Restaurant;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddEngagementRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'restaurant_id' => ['required', 'exists:restaurants,id'],
            'type' => ['required', Rule::enum(EngagementType::class)],
            'rating' => ['nullable', 'integer', Rule::in(2, 4, 6, 8, 10), Rule::requiredIf(fn () => $this->isVisitRequest())],
        ];
    }

    public function restaurant(): Restaurant
    {
        return Restaurant::query()->findOrFail($this->integer('restaurant_id'));
    }

    public function isVisitRequest(): bool
    {
        return $this->type() === EngagementType::Visit;
    }

    public function type(): EngagementType
    {
        return $this->enum('type', EngagementType::class);
    }

    public function rating(): int|null
    {
        return $this->isVisitRequest()
            ? $this->integer('rating')
            : null;
    }
}
