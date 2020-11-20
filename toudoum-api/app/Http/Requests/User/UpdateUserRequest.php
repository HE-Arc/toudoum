<?php

namespace App\Http\Requests\User;

use App\Http\Requests\ApiRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class UpdateUserRequest extends ApiRequest
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
            'name.required'     => 'A name for the user is required.',
            'firstname.required'     => 'A firstname for the user is required.',
            'email.required'     => 'A email for the user is required.',
            'password.required'     => 'A password for the user is required.',
            'password_confirmation.required'     => 'A password_confirmation for the user is required.',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $user = User::find(Auth::user()->id);
        if($this->get("password") != $this->get('password_confirmation'))
        {
            throw new HttpResponseException(
                response()->json(
                    [
                        "message" => "Password and password' condfirmation are different",
                        "status" => JsonResponse::HTTP_UNPROCESSABLE_ENTITY,
                        "code" => 0,
    
                    ],
                    JsonResponse::HTTP_UNPROCESSABLE_ENTITY
                )
            );
        }
        $rules = [
            'name' => 'string',
            'firstname' => 'string',
            'password' => 'required|string|min:6',
            'password_confirmation' => 'required|string|min:6',
        ];
        if($user->email == $this->get('email'))
        {
            $rules['email'] = 'string|email|max:255';
        }
        else
        {
            $rules['email'] = 'unique:users|string|email|max:255';
        }
        return $rules;
    }
}
