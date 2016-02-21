/**
  * Created by woutervanrossem on 27/11/15.
  */

def sqrt(x: Double): Double = sqrtIter(1.0, x)

def sqrtIter(guess: Double, x: Double): Double =
  if (ifGoodEnough(guess, x)) guess
  else sqrtIter(improve(guess, x), x)

def isGoodEnough(guess: Double, x: Double) =

