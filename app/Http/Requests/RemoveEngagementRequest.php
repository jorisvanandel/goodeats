<?php

namespace App\Http\Requests;

use App\Enums\EngagementType;
use App\Models\Restaurant;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RemoveEngagementRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'restaurant_id' => ['required', 'exists:restaurants,id'],
            'type' => ['required', Rule::enum(EngagementType::class)],
        ];
    }

    public function restaurant(): Restaurant
    {
        return Restaurant::query()->findOrFail($this->integer('restaurant_id'));
    }

    public function type(): EngagementType
    {
        return $this->enum('type', EngagementType::class);
    }
}
