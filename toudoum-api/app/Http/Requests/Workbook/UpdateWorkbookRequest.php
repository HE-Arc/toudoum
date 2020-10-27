<?php

namespace App\Http\Requests\Workbook;

use App\Http\Requests\ApiRequest;

class UpdateWorkbookRequest extends ApiRequest
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
            'name.required'     => 'A name for the workbook is required.',
            'group_id.required'     => 'Foreignkey on group_id is missing.'
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
            'name'    => 'required|max:255',
            'group_id'    => 'required',
        ];
    }
}
