using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

[ApiController]
[Route("[controller]")]
public class QuotesController : ControllerBase
{
    private static readonly List<string> Quotes = new List<string>
    {
        "Believe you can and you're halfway there.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "Don't watch the clock; do what it does. Keep going.",
        "The only way to do great work is to love what you do.",
        "Your time is limited, don't waste it living someone else's life.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Strive not to be a success, but rather to be of value.",
        "The only limit to our realization of tomorrow will be our doubts of today.",
        "Do what you can, with what you have, where you are.",
        "Everything you've ever wanted is on the other side of fear.",
        "Success is not how high you have climbed, but how you make a positive difference to the world.",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "Dream big and dare to fail.",
        "You are never too old to set another goal or to dream a new dream.",
        "Don't let yesterday take up too much of today.",
        "You miss 100% of the shots you don't take.",
        "The only person you are destined to become is the person you decide to be.",
        "Believe in yourself, take on your challenges, dig deep within yourself to conquer fears.",
        "The secret of getting ahead is getting started.",
        "If you want to lift yourself up, lift up someone else.",
        "You don't have to be great to start, but you have to start to be great.",
        "The best way to predict the future is to create it.",
        "If you can dream it, you can do it.",
        "The only way to achieve the impossible is to believe it is possible.",
        "Success is walking from failure to failure with no loss of enthusiasm.",
        "The difference between ordinary and extraordinary is that little extra.",
        "It always seems impossible until it's done.",
        "The purpose of our lives is to be happy.",
        "Life is what happens to you while you're busy making other plans.",
        "It does not matter how slowly you go as long as you do not stop."
    };

    private static Random rng = new Random();

    [HttpGet]
    public IEnumerable<string> Get()
    {
        return GetRandomQuotePair();
    }

    private IEnumerable<string> GetRandomQuotePair()
    {
        var shuffledQuotes = Quotes.OrderBy(q => rng.Next()).ToList();
        return shuffledQuotes.Take(2);
    }
}