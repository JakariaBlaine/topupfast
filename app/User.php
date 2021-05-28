<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\ResetPasswordNotification;
class User extends Authenticatable implements MustVerifyEmail
{
		use HasApiTokens,Notifiable;
		/**
		 * The attributes that are mass assignable.
		 *
		 * @var array
		 */ 
		

		protected $guarded = [];

		/**
		 * The attributes that should be hidden for arrays.
		 *
		 * @var array
		 */
		protected $hidden = [
				'password', 'remember_token',
		];

		/**
		 * The attributes that should be cast to native types.
		 *
		 * @var array
		 */
		protected $casts = [
				'email_verified_at' => 'datetime',
		];

		// public function sendPasswordResetNotification($token)
		// {
		//     $this->notify(new ResetPasswordNotification($token));
		// }

		public function getWalletBalance()
		{
			if($this->is_admin == 1)
			{
				return false;
			}
			$total_income = 0;
			$orders = Order::where('accept_id', $this->id)->where('status', 'complete')->with("package.product")->get();

			foreach($orders as $order)
            {
                $total_income += $order->package->product->seller_commission;
            }
            $withdraw_amount = WithdrawRequest::where('user_id', auth()->user()->id)
						                        ->where('status', 'approved')
						                        ->sum('withdraw_amount');
            return $total_income - $withdraw_amount;
		}
}
