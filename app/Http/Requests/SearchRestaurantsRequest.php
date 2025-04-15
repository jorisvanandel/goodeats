<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRestaurantsRequest extends FormRequest
{
    /**
     * @return array<string, list<string>>
     */
    public function rules(): array
    {
        return [
            'query' => ['nullable', 'string'],
        ];
    }

    public function searchQuery(): ?string
    {
        return $this->get('query');
    }
}
