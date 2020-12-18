<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Carbon\Carbon;

/**
 * Parent class of Each controller
 */
class Controller extends BaseController
{
	use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	/**
	 * This function concate a token response.
	 */
	protected function token($personalAccessToken, $user, $message = null, $code = 200)
	{
		$tokenData = [
			'access_token' => $personalAccessToken->accessToken,
			'token_type' => 'Bearer',
			'expires_at' => Carbon::parse($personalAccessToken->token->expires_at)->toDateTimeString(),
			"user" => $user
		];

		return $this->success($tokenData, $message, $code);
	}

	/**
	 * This function concate an response with his status, message and data
	 */
	protected function success($data, $message = null, $code = 200)
	{
		return response()->json([
			'status' => 'Success',
			'message' => $message,
			'data' => $data
		], $code);
	}

	/**
	 * This function concate an error with his status, message, and data is null
	 */
	protected function error($message = null, $code)
	{
		return response()->json([
			'status' => 'Error',
			'message' => $message,
			'data' => null
		], $code);
	}
}
