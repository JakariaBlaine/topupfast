<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = [];


    public function package()
    {
    	return $this->belongsTo("App\Package")->with('product');
    }

    public function user()
    {
    	return $this->belongsTo("App\User");
    }

    public function accept_by()
    {
        return $this->belongsTo("App\User", "accept_id", "id");
    }
}
