<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ApiRequest;

class SignUpRequest extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required'     => 'A name for the auth is required.',
            'firstname.required'     => 'A firstname for the auth is required.',
            'email.required'     => 'A email for the auth is required.',
            'password.required'     => 'A password for the auth is required.',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'firstname' => 'required|string',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ];
    }
}