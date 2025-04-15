<?php

namespace App\Http\Requests;

use App\Models\Restaurant;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class AddLikeRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'restaurant_id' => ['required', 'exists:restaurants,id'],
        ];
    }

    public function restaurant(): Restaurant
    {
        return Restaurant::query()->findOrFail($this->integer('restaurant_id'));
    }
}
