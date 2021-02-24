<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PkfkEnglishVietnamese extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('english_vietnamese', function (Blueprint $table) {
            $table->foreign('english_id')->references('id')->on('englishes')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('vietnamese_id')->references('id')->on('vietnameses')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('english_vietnamese');
    }
}
