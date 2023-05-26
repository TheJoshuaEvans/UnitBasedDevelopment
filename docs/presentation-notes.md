# 1
Read the slide :)  [CLICK]

-----------------------------------------
# 2
Don’t participate if you don’t want to

[CLICK]
[READ SLIDE]
…whether for work or for other projects

[PAUSE]
[CLICK]
[READ SLIDE]
…not because have to as enforced by your job or open source standard

[PAUSE]
And finally…
[CLICK]
[READ SLIDE]

[Remember!!!!!!! Never expect a specific answer]
[Many hands up:]
That’s a pleasant surprise, to be honest. I’m looking forward to the discussion after the talk

[Few hands up:]
I still have my hand up, and really, the goal of this talk is to explain how and why

[CLICK]

-----------------------------------------
# 3
First, though, just who is this guy again?

[CLICK THROUGH SLIDE]

-----------------------------------------
# 4
I really do mean “on my own”

[CLICK - READ SLIDE]
[CLICK - READ SLIDE]

[CLICK]
My source… My source is [CLICK] that I made it up!

So, all that being said…
[CLICK]

-----------------------------------------
# 5
Let’s begin at the beginning with… [CLICK]

-----------------------------------------
# 6
The good ol’ automated testing pyramid as introduced by Mike Cohn in 2009

[CLICK]
[READ SLIDE]
[CLICK]
[READ SLIDE]
[CLICK]
[READ SLIDE]

…and, as the pyramid shape suggests, you should have more unit tests, than integration tests, than end to end tests

The automated testing pyramid is a perfectly accurate technical definition of different types of automated tests, and their ideal frequency

Buuuuuuuut
[CLICK]

-----------------------------------------
# 7
I think it is lacking as a practical definition

First
[CLICK] 
[READ SLIDE]
There are obvious cases like getting data from a database
but there are also less obvious ones like testing code in the same project under different namespaces
This isn’t a huge issue, but can lead to organizational conflict and confusion

Also…
[CLICK]
[READ SLIDE]
Manual tests are the easiest to “write”, since there is no writing at all
End to end tests are actually testing the things the client cares about
And it can be hard to break functionality down into integration or unit tests when a system is not built with testing in mind

And finally, but most importantly
[CLICK]
[READ SLIDE]
This means that, in our minds, we consider “writing tests” and “writing code” to be two separate classes of task - often meaning that a context-shift is required to move between one and the other

And I really cannot stress enough that…
[CLICK]

-----------------------------------------
# 8
[READ SLIDE]
[PAUSE]

Okay, so maybe “disaster” is a strong word - but it can mean that
Testing is the first thing to go when under time pressure
Test code is not held to the same standard as other code, and
Failing tests that don’t break higher functionality are often ignored

Enter…!
[CLICK]

-----------------------------------------
# 9
Test driven development!

[DESCRIBE CHART]

It solves a lot of these issues because
1. Starting the process with the unit tests means there can be no confusion about how tests should be organized after the fact
2. Since “units” of testable functionality are the atomic particles of the program it makes it a lot easier to keep the pyramid the correct shape
3. Testing is a core part of the development experience, and so test code will naturally be written more carefully

Buuuuuuuuuuuut…
[CLICK]

-----------------------------------------
# 10
Test driven development has some problems in practice

First,
[CLICK]
[READ SLIDE]
I think this is really the most important point
A lot of times, we aren’t actually sure what the results of an operation should exactly look like before we start writing
And there’s no place in the Tee Dee Dee lifecycle for this experimentation

But also
[CLICK]
[READ SLIDE]
If the metric for success is a green checkmark, you write for the green checkmark, not the core functionality

[CLICK]
[READ SLIDE]
…if tests need to be approved or are written by other people

And finally…
[CLICK]
[READ SLIDE]

I mean…
[CLICK]

-----------------------------------------
# 11
Look at it!
It just looks complicated

It’s [CLICK]  like I’m looking at the Calvin cycle over here or something! Right?

It can seem intimidating, which can make getting organization buy-in harder

[CLICK]

-----------------------------------------
# 12
…So there are still some problems to figure out

Pondering solutions to these problems is what led me to…
[CLICK]

-----------------------------------------
# 13
[READ THROUGH SLIDE]

And let’s start with…
[CLICK]

-----------------------------------------
# 14
The testing pyramid

My suggestion, basically, is to extend and modify the pyramid so that it looks like…

[CLICK]
[PAUSE]
This

[CLICK]

-----------------------------------------
# 15
[CLICK]
Units, at the bottom, are the actual pieces of functional code

[CLICK]
[READ SLIDE]
…with a heavy preference for local tests

And
[CLICK] 
[READ SLIDE]
They aren’t what this talk is about

So…
[CLICK]

-----------------------------------------
# 16
What exactly is a “Unit”?

Well
[READ SLIDE]
[CLICK]

Firstly, the function itself has no internal state whatsoever. Every function call is just like every other function call
[CLICK]

The function accepts inputs in the form of parameters, including any relevant state information the unit might need
[CLICK]

The function returns results as outputs back to the original caller
[CLICK]

And finally, the function might perform external actions (or “side effects”) such as getting data from a database or communicating with the operating system

So, that being units…
[CLICK]

-----------------------------------------
# 17
[READ SLIDE]
…It’s a whole different definition

So uhhhh… What about integrations tests?

[CLICK]

-----------------------------------------
# 18
Well…
[READ SLIDE]

Back in the ~far distant past of 2009~ developers would need to either maintain resource intensive VMs of their environments, or set up their local environments to match the production expectations - the distinction was important and valuable

These days a single “docker-compose” file, for instance, can be used to easily set up a production-matching development environment for most any developer with a single command

Specifically…
[CLICK]

-----------------------------------------
# 19
Within a docker-compose file,
The YAML in this first example will set up a Postgres v11 database, available at the regular postgres port
And fun fact, Postgres v11 is the current latest supported by AWS Aurora!

Speaking of AWS [CLICK], we can emulate some of the functionality of the cloud service using “Localstack” - as pictured here. Specifically, I’m setting up localstack with the S3 service. Azure and Google Cloud Platform also have some local-stack-esque capabilities, but it’s much more limited

Finally [CLICK], I use these npm scripts to simplify spinning up and tearing down my environment - including the deletion of any container volumes

Using these tools, or tools like it, we can mostly do away with the distinction between integration and unit tests…

-----------------------------------------
# 20
Mostly…

[CLICK]
[READ SLIDE]
…for whatever reason

So while…
[CLICK]
[READ SLIDE]

[CLICK]
[READ SLIDE]
…usually over the internet

[CLICK]
[READ SLIDE]

However…
[CLICK]

-----------------------------------------
# 21
[READ SLIDE]
…which can significantly slow down development

To handle this, I [CLICK] separate the remote and local tests, and only run the remote tests when I really want to

With Jest, I can be even more clever and mark the remote tests as “skipped” when not being run, which is what this code does

So…
[CLICK]

-----------------------------------------
# 22
When I run all tests, they all appear as passed, as seen here

And when I run just the local tests [CLICK], the remote tests are reported as “skipped”, like this,
So the total test count remains the same

And, with that said, let’s move on to…
[CLICK]

-----------------------------------------
# 23
The Unit Based Development pipeline!

First, we need to figure out what we actually want to write, and what units we are going to need

Then, we sub out the unit and write function-level documentation describing what we need to do

Then, we write code!
Writing tests, running tests, writing functionality, and refactoring are all done more-or-less simultaneously

And finally, once we are satisfied with all our code, we perform final validation by running any higher level or slow tests to make sure everything still works
[CLICK]

-----------------------------------------
# 24
Going into more detail…
The first step to any development task is to figure out what we want to do, and how we want to do it

Mainly, this involves figuring out what units we need to complete our task

Once we have figured it out, the next step is to [CLICK] stub out the units we want to make

Here, in this example, I’ve stubbed the “initDB” function. It doesn’t do anything at all, but it is fully documented in human language
I know what this unit is supposed to do, so now I need to make it do it!
[CLICK]

-----------------------------------------
# 25
When it comes to actually writing the units, we jump between writing tests, running tests, and writing functionality as needed

It’s always preferable to write tests first, if we can, but it’s not required

And all local tests, as well as the tests for the unit we are building, are constantly run while developing
[CLICK]

-----------------------------------------
# 26
And this is what my IDE looks like while I am developing a unit

Each unit gets its own file, as well as a test file in the same directory

I will actually put the unit, and the unit tests side-by-side in my coding window, which makes jumping between them especially easy

I am also using the VSCode Jest extension to automatically run relevant local tests whenever a change is made
Which is what these tiny little green check-marks represent

Organizing code like this also makes debugging a lot easier, since we can debug against the unit tests themselves
[CLICK]

-----------------------------------------
# 27
It’s also extremely important that we write good unit tests
We wind up writing a TON of tests with UBD, so it’s important they are as good as possible

And to me, the most important aspect of a unit test is that [CLICK]
[READ SLIDE]

When unit tests do make internal demands, non-breaking changes can cause tests to fail - which is the death knell for unit testing

Therefore [CLICK] mocking is an anti-pattern
[CLICK]

-----------------------------------------
# 28
Take this code, for example

It’s fairly simple - we stringify an object then send that stringified object to S3

If we wanted to add mocking so that S3 wasn’t touched, we would overwrite the “s3Sdk.send” function,
Replacing it with a simpler method that made sure we were using the “PutObjectCommand” correctly

However, this changes what the unit test is actually checking
This unit is meant to put an object into S3
We know the unit works if, after running the unit, an object is in S3 where there wasn’t one before

When we mock internal functions, we change the unit test so that we are no longer verifying the higher-level functionality of the code,
Instead, the test now checks whether or not you are using the “s3Sdk.send” command in a very particular way

Should we change this method later to use a different command, or we change how we are calling this command,
Then the unit test may break, even though the unit itself is still fully functional

Mocking can have a place as a last resort, where no local environment exists and a remote test would be unacceptable, but it should be avoided whenever possible
[CLICK]

-----------------------------------------
# 29
Refactoring!

[CLICK]
[READ SLIDE]

[CLICK]
[READ SLIDE]
Before changing any existing code, make sure that all the existing code works as expected
If we start a refactor from all passing tests, we know our refactor is successful when all those same tests still pass

So this does mean
[CLICK]
[READ SLIDE]
It’s all still part of the same step, but we just need to be a bit more careful when changing existing code

[CLICK]

-----------------------------------------
# 30
And finally, we have final validation

Once all our code is written and all our fast-running tests pass,
We run all tests, including remote and end-to-end tests

With the final result being, [CLICK] coding bliss
[PAUSE]
[CLICK]

-----------------------------------------
# 31
And that’s it really! There are always more details to dive into, but those are the core ideas!

That big ol’ QR code on the screen links to the public GitHub project I made to demo all of this
All the previously shown code snippets can be found, in context, in that project, along with some other fun bits and bobs

And finally, I do want to acknowledge that there are some gaps in my experience with this paradigm
I’ve always been a solo backend developer, so I don’t really know how this system will work in a team, or a frontend development environment
I’m excited to hear what people’s thoughts may be!

[FIN]

Time for any questions
