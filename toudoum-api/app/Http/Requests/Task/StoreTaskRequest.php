<?php

namespace App\Http\Requests\Task;

use App\Http\Requests\ApiRequest;

class StoreTaskRequest extends ApiRequest
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
            'name.required'         => 'A name for the task is required.',
            'workbook_id.required'  => 'A workbook for the task is required.'
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
            'name'        => 'required',
            'workbook_id' => 'required',
        ];
    }
}
