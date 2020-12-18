<?php

namespace App\Http\Requests\User;

use App\Http\Requests\ApiRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\App;

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
        $msg = __('error_message.name');
        $msg[] = __('error_message.firstname');
        $msg[] = __('error_message.email');
        $msg[] = __('error_message.password');
        $msg[] = __('error_message.password_confirmation');
        return $msg;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $user = User::find(Auth::user()->id);
        
        # Password different
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

        # Classic rules without email
        $rules = [
            'name' => 'string|required',
            'firstname' => 'string|required',
            'password' => 'required|string|min:6',
            'password_confirmation' => 'required|string|min:6',
        ];

        # If new email -> must be unique in the database
        if($user->email == $this->get('email'))
        {
            $rules['email'] = 'string|required|email|max:255';
        }
        else
        {
            $rules['email'] = 'unique:users|required|string|email|max:255';
        }
        return $rules;
    }
}
