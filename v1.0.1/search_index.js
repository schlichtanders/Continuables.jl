var documenterSearchIndex = {"docs":
[{"location":"library/","page":"Library","title":"Library","text":"CurrentModule = Continuables","category":"page"},{"location":"library/#Public-API","page":"Library","title":"Public API","text":"","category":"section"},{"location":"library/","page":"Library","title":"Library","text":"","category":"page"},{"location":"library/#Core","page":"Library","title":"Core","text":"","category":"section"},{"location":"library/","page":"Library","title":"Library","text":"Continuable\n@cont\n@Ref\ninnerfunctype\nAbstractContinuable","category":"page"},{"location":"library/#Continuables.Continuable","page":"Library","title":"Continuables.Continuable","text":"Continuable(func)\n\nAssumes func to have a single argument, the continuation function (usually named cont).\n\nExample\n\nContinuable(function (cont)\n  for i in 1:10\n    cont(i)\n  end\nend)\n\n\n\n\n\n","category":"type"},{"location":"library/#Continuables.@cont","page":"Library","title":"Continuables.@cont","text":"@cont begin\n  cont(1)\n  cont(2)\nend\n\ntranslates to\n\nContinuable(function(cont)\n  cont(1)\n  cont(2)\nend)\n\nFurthermore, also function syntax is especially supported\n\n@cont function(a, b) begin\n  cont(a)\n  cont(b)\nend\n\nis translated to\n\nfunction(a, b)\n  Continuable(function(cont)\n    cont(1)\n    cont(2)\n  end)\nend\n\nIn summary, @cont wraps the return value into a Continuable.\n\n\n\n\n\n","category":"macro"},{"location":"library/#Continuables.@Ref","page":"Library","title":"Continuables.@Ref","text":"@Ref begin\n  a = Ref(2)\n  a + 3\nend\n\nis translated to\n\nbegin\n  a = Ref(2)\n  a.x + 3\nend\n\nSo that you do not need to write a.x  or 'a[]' all the way.\n\nThe macro works correctly with subfunctions shadowing the variables.\n\n\n\n\n\n","category":"macro"},{"location":"library/#Continuables.innerfunctype","page":"Library","title":"Continuables.innerfunctype","text":"innerfunctype(continuable)\n\nReturns the generic type of continuable.f. This can be used to specialize functions on specific Continuables, like Base.IteratorSize and else.\n\nExamples\n\nmycont(x) = @cont cont(x)\nBase.length(::Continuable{<:innerfunctype(mycont(:examplesignature))}) = :justatest\nlength(mycont(1)) == :justatest\nlength(mycont(\"a\")) == :justatest\n# other continuables are not affected\nanothercont(x) = @cont cont(x)\nlength(anothercont(42)) == 1\n\n\n\n\n\n","category":"function"},{"location":"library/#Continuables.AbstractContinuable","page":"Library","title":"Continuables.AbstractContinuable","text":"AbstractContinuable\n\nAbstract type which all continuable helper functions use for dispatch.\n\nThe interface for a continuable just consists of\n\nBase.foreach(cont, continuable::YourContinuable)\n\nFor julia 1.0 you further need to provide\n\n(continuable::YourContinuable)(cont) = foreach(cont, continuable)\n\nwhich is provided automatically for more recent julia versions.\n\n\n\n\n\n","category":"type"},{"location":"library/#Conversions","page":"Library","title":"Conversions","text":"","category":"section"},{"location":"library/","page":"Library","title":"Library","text":"aschannel\nascontinuable\ni2c\n@i2c","category":"page"},{"location":"library/#Continuables.aschannel","page":"Library","title":"Continuables.aschannel","text":"aschannel(continuable) -> Channel\n\nConvert the continuable into a channel. Performance is identical compared to when you would have build a Channel directly.\n\n\n\n\n\n","category":"function"},{"location":"library/#Continuables.ascontinuable","page":"Library","title":"Continuables.ascontinuable","text":"ascontinuable(iterable)\n\nConverts an iterable to a Continuable. There should not be any performance loss.\n\n\n\n\n\n","category":"function"},{"location":"library/#Continuables.i2c","page":"Library","title":"Continuables.i2c","text":"i2c(iterable)\n\nAlias for ascontinuable. \"i2c\" is meant as abbreviation for \"iterable to continuable\". Also comes in macro form as @i2c.\n\n\n\n\n\n","category":"function"},{"location":"library/#Continuables.@i2c","page":"Library","title":"Continuables.@i2c","text":"@i2c iterable\n\nAlias for ascontinuable. \"i2c\" is meant as abbreviation for \"iterable to continuable\". Also comes in function form as i2c.\n\n\n\n\n\n","category":"macro"},{"location":"library/#Factories","page":"Library","title":"Factories","text":"","category":"section"},{"location":"library/","page":"Library","title":"Library","text":"emptycontinuable\nsingleton\nrepeated\niterated","category":"page"},{"location":"library/#Continuables.emptycontinuable","page":"Library","title":"Continuables.emptycontinuable","text":"emptycontinuable\n\nThe continuable with no elements.\n\n\n\n\n\n","category":"constant"},{"location":"library/#Continuables.singleton","page":"Library","title":"Continuables.singleton","text":"singleton(value)\n\nConstruct a Continuable containing only the one given value.\n\n\n\n\n\n","category":"function"},{"location":"library/#Continuables.repeated","page":"Library","title":"Continuables.repeated","text":"repeated(() -> 2[, n])\nrepeated([n]) do\n  # ...\n  \"returnvalue\"\nend\n\nConstructs a Continuable which repeatedly yields the returnvalue from calling the given function again and again. Until infinity or if n is given, exactly n times.\n\n\n\n\n\n","category":"function"},{"location":"library/#Continuables.iterated","page":"Library","title":"Continuables.iterated","text":"iterated((x) -> x*x, startvalue)\niterated(startvalue) do x\n  # ...\n  x*x\nend\n\nConstructs an infinite Continuable which\n\n\n\n\n\n","category":"function"},{"location":"library/#Common-Helpers","page":"Library","title":"Common Helpers","text":"","category":"section"},{"location":"library/","page":"Library","title":"Library","text":"collect\nreduce\nreduce!\nzip\nproduct\nchain\nflatten\ncycle\nforeach\nmap\nall\nany\nsum\nprod\ntake\ntakewhile\ndrop\ndropwhile\npartition\ngroupbyreduce\ngroupby\nnth","category":"page"},{"location":"library/#Base.collect","page":"Library","title":"Base.collect","text":"collect(continuable[, n]) -> Vector\n\nConstructs Vector out of the given Continuable. If also given the length n explicitly, a Vector of respective is preallocated. IMPORTANTLY n needs to be the true length of the continuable. Smaller n will result in error.\n\n\n\n\n\n","category":"function"},{"location":"library/#Base.reduce","page":"Library","title":"Base.reduce","text":"reduce(operator, continuable; [init])\n\nLike Base.reduce this will apply operator iteratively to combine all elements into one accumulated result.\n\n\n\n\n\n","category":"function"},{"location":"library/#Continuables.reduce!","page":"Library","title":"Continuables.reduce!","text":"reduce!(op!, continuable; [init])\n\nMutating version of Base.reduce\n\nIf no init is given     op! is assumed to mutate a hidden state (equivalent to mere continuation) else     init is the explicit state and will be passed to op! as first argument (the accumulator)\n\n\n\n\n\n","category":"function"},{"location":"library/#Base.Iterators.zip","page":"Library","title":"Base.Iterators.zip","text":"zip(continuables...; [lazy])\n\nConstructs new Continuable with elements from the given continuables zipped up. I.e. will yield for each position in the original continuables a tuple (x, y, ...) where x, y, ... are the elements from continuables at the same position respectively.\n\nIf lazy=true (default), it will use Channels to do the zipping. Elseif lazy=false, it will use Arrays instead.\n\n!!! warning CAUTION     zip on Continuables is not performant, but will fallback to either Channels (lazy=true, default) which are     very slow, or Arrays (lazy=false) which will load everything into Memory.\n\n\n\n\n\n","category":"function"},{"location":"library/#Base.Iterators.product","page":"Library","title":"Base.Iterators.product","text":"product(continuables...)\n\nConstruct a new Continuable which yields all combinations of the given continuables, analog to how Iterators.product work for iterables.\n\nMind that product() will still return an empty iterator instead of an empty Continuable. Use emptycontinuable instead if you need an empty Continuable.\n\n\n\n\n\n","category":"function"},{"location":"library/#Continuables.chain","page":"Library","title":"Continuables.chain","text":"chain(continuables...)\nchain(iterables...) = flatten(iterables)\n\nWhen given Continuables it will construct a new continuable by concatinating all given continuables. When given anything else it will default to use Iterator.flatten.\n\n\n\n\n\n","category":"function"},{"location":"library/#Base.Iterators.flatten","page":"Library","title":"Base.Iterators.flatten","text":"flatten(continuable_of_continuables)\n\nConstructs new Continuable by concatinating all continuables in the given continuable_of_continuables. Analog to Iterators.flatten.\n\nFor iterables of continuable use Continuables.chain(iterable_of_continuables...) instead.\n\n\n\n\n\n","category":"function"},{"location":"library/#Base.Iterators.cycle","page":"Library","title":"Base.Iterators.cycle","text":"cycle(continuable[, n])\n\nConstructs new Continuable which loops through the given continuable. If n is given, it will loop n times, otherwise endlessly.\n\n\n\n\n\n","category":"function"},{"location":"library/#Base.foreach","page":"Library","title":"Base.foreach","text":"foreach(func, continuable)\n\nRuns the continuable with func as the continuation. This is the core interface of a continuable.\n\nIt is especially handy when using do syntax.\n\n\n\n\n\n","category":"function"},{"location":"library/#Base.map","page":"Library","title":"Base.map","text":"map(func, continuable)\n\nConstructs new Continuable where the given func was applied to each element.\n\n\n\n\n\n","category":"function"},{"location":"library/#Base.all","page":"Library","title":"Base.all","text":"all([func, ]continuable; [lazy])\n\nChecks whether all elements in the continuable are true. If a function func is given, it is first applied to the elements before comparing for truth.\n\nIf lazy=true (default) the Continuable will only be evaluated until the first false value. Elseif lazy=false all elements of the Continuable will be combined.\n\n\n\n\n\n","category":"function"},{"location":"library/#Base.any","page":"Library","title":"Base.any","text":"any([func, ]continuable; [lazy])\n\nChecks whether at least one element in the continuable is true. If a function func is given, it is first applied to the elements before comparing for truth.\n\nIf lazy=true (default) the Continuable will only be evaluated until the first true value. Elseif lazy=false all elements of the Continuable will be combined.\n\n\n\n\n\n","category":"function"},{"location":"library/#Base.sum","page":"Library","title":"Base.sum","text":"sum(continuable)\n\nsums up all elements\n\n\n\n\n\n","category":"function"},{"location":"library/#Base.prod","page":"Library","title":"Base.prod","text":"sum(continuable)\n\nmultiplies up all elements\n\n\n\n\n\n","category":"function"},{"location":"library/#Base.Iterators.take","page":"Library","title":"Base.Iterators.take","text":"take(continuable, n)\ntake(n, continuable)\n\nConstruct a new Continuable which only yields the first n elements. n can be larger as the total length, no problem.\n\n\n\n\n\n","category":"function"},{"location":"library/#Continuables.takewhile","page":"Library","title":"Continuables.takewhile","text":"takewhile(predicate, continuable)\ntakewhile(predicate, iterable)\n\nIf given a Continuable, it constructs a new Continuable yielding elements until predicate(element) returns false.\n\nAlso implements a respective functionality for iterables for convenience.\n\n\n\n\n\n","category":"function"},{"location":"library/#Base.Iterators.drop","page":"Library","title":"Base.Iterators.drop","text":"drop(continuable, n)\ndrop(n, continuable)\n\nConstruct a new Continuable which yields all elements but the first n. n can be larger as the total length, no problem.\n\n\n\n\n\n","category":"function"},{"location":"library/#Continuables.dropwhile","page":"Library","title":"Continuables.dropwhile","text":"dropwhile(predicate, continuable)\ndropwhile(predicate, iterable)\n\nIf given a Continuable, it constructs a new Continuable yielding elements until predicate(element) returns true.\n\nAlso implements a respective functionality for iterables for convenience.\n\n\n\n\n\n","category":"function"},{"location":"library/#Base.Iterators.partition","page":"Library","title":"Base.Iterators.partition","text":"partition(continuable, n[, step])\n\nConstructs new Continuable which yields whole subsections of the given continuable, gathered as Vectors. n is the length of a subsection. The very last subsection might be of length n or smaller respectively, collecting the remaining elements.\n\nIf step is given, the second subsection is exactly step-number of elements apart from the previous subsection, and hence overlapping if n > step. Further, importantly, if step is given, there is no rest, but each subsection will be guaranteed to have the same length. This semantics is copied from IterTools.jl\n\nExamples\n\njulia> using Continuables\n\njulia> partition(i2c(1:10), 3) |> collect\n4-element Array{Any,1}:\n Any[1, 2, 3]\n Any[4, 5, 6]\n Any[7, 8, 9]\n Any[10]\njulia> partition(i2c(1:10), 5, 2) |> collect\n3-element Array{Any,1}:\n Any[1, 2, 3, 4, 5]\n Any[3, 4, 5, 6, 7]\n Any[5, 6, 7, 8, 9]\njulia> partition(i2c(1:10), 3, 3) |> collect\n3-element Array{Any,1}:\n Any[1, 2, 3]\n Any[4, 5, 6]\n Any[7, 8, 9]\n\n\n\n\n\n","category":"function"},{"location":"library/#Continuables.groupbyreduce","page":"Library","title":"Continuables.groupbyreduce","text":"groupbyreduce(by, continuable, op2[, op1])\ngroupbyreduce(by, iterable, op2[, op1])\n\nGroup elements and returns OrderedDict of keys (constructed by by) and values (aggregated with op2/op1) If given anything else then a continuable, we interpret it as an iterable and provide the same functionality.\n\nParameters\n\nby: function of element to return the key for the grouping/dict continuable: will get grouped op2: f(accumulator, element) = newaccumulator op1: f(element) = initialaccumulator\n\nExamples\n\njulia> using Continuables\n\njulia> groupbyreduce(x -> x % 4, @i2c(1:10), (x, y) -> x + y)\nOrderedCollections.OrderedDict{Any,Any} with 4 entries:\n  1 => 15\n  2 => 18\n  3 => 10\n  0 => 12\njulia> groupbyreduce(x -> x % 4, @i2c(1:10), (x, y) -> x + y, x -> x+5)\nOrderedCollections.OrderedDict{Any,Any} with 4 entries:\n  1 => 20\n  2 => 23\n  3 => 15\n  0 => 17\n\n\n\n\n\n","category":"function"},{"location":"library/#Continuables.groupby","page":"Library","title":"Continuables.groupby","text":"groupby(f, continuable)\ngroupby(f, iterable)\n\nWrapper around the more general groupbyreduce which combines elements to a Vector. If you happen to aggregate your resulting grouped Vectors, think about using groupbyreduce directly, as this can massively speed up aggregations.\n\nNote that the interface is different from IterTools.groupby, as we directly return an OrderedDict (instead of a iterable of values).\n\nExamples\n\njulia> using Continuables\n\njulia> groupby(x -> x % 4, @i2c 1:10)\nOrderedCollections.OrderedDict{Any,Any} with 4 entries:\n  1 => [1, 5, 9]\n  2 => [2, 6, 10]\n  3 => [3, 7]\n  0 => [4, 8]\n\n\n\n\n\n","category":"function"},{"location":"library/#Continuables.nth","page":"Library","title":"Continuables.nth","text":"nth(continuable, n)\nnth(n, continuable)\n\nExtracts the nth element from the given continuable.\n\nExamples\n\njulia> using Continuables\n\njulia> nth(i2c(4:10), 3)\n6\njulia> nth(1, i2c(4:10))\n4\n\n\n\n\n\n","category":"function"},{"location":"manual/#Manual","page":"Manual","title":"Manual","text":"","category":"section"},{"location":"manual/","page":"Manual","title":"Manual","text":"TLDR: Python / C# yield with performance matching plain Julia iterators  (i.e. unbelievably fast)","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"Continuables are generator-like higher-order functions which take a continuation as an extra argument. The key macro provided by the package is @cont which will give access to the special function cont within its scope and wraps the computation in a special Type Continuables.Continuable. It is best to think of cont in the sense of yield from Python's Generators. It generates values and takes feedback from the outer process as return value.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"If you come from Python, use Continuables wherever you would use generators. If you are Julia-native, Continuables can be used instead of Julia's Channels in many place with drastic performance-improvements (really drastic: in the little benchmark example below it is 20 million times faster!).","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"This package implements all standard functions like e.g. collect, reduce, any and others. As well as functionalities known from Base.Iterators and IterTools.jl like take, dropwhile, groupby, partition, nth and others.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"For convenience, all methods also work for plain iterables.","category":"page"},{"location":"manual/#Example-of-a-Continuable","page":"Manual","title":"Example of a Continuable","text":"","category":"section"},{"location":"manual/","page":"Manual","title":"Manual","text":"Let's define our fist continuable by wrapping a simple range iterator 1:n.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"using Continuables\n# new Continuable ---------------------------------------------\ncorange(n::Integer) = @cont begin\n  for i in 1:n\n    cont(i)\n  end\nend","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"That's it. Very straight forward and intuitive.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"Many standard functions work seamlessly for Continuables.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"using Continuables\ncollect(corange(10)) == collect(1:10)\n\nco2 = map(corange(5)) do x\n  2x\nend\ncollect(co2) == [2,4,6,8,10]\n\nforeach(println, corange(3))  # 1, 2, 3\n\nforeach(chain(corange(2), corange(4))) do x\n  print(\"$x, \")\nend # 1, 2, 1, 2, 3, 4,  \n\nreduce(*, corange(4)) == 24\n\nall(x -> x < 5, corange(3))\nany(x -> x == 2, corange(3))\n\nmap(corange(10)) do x\n  corange(x)\nend |> flatten |> co -> take(co, 5) |> collect == Any[1,1,2,1,2]\n\ncollect(product(corange(2), corange(3))) == Any[\n  (1, 1),\n  (1, 2),\n  (1, 3),\n  (2, 1),\n  (2, 2),\n  (2, 3),\n]\ncollect(partition(corange(11), 4)) == [\n  Any[1,2,3,4],\n  Any[5,6,7,8],\n  Any[9,10,11],\n]\nusing OrderedCollections\ngroupbyreduce(isodd, corange(5), +) == OrderedDict{Any, Any}(\n  true => 9,\n  false => 6,\n)\n\nnth(3, ascontinuable(4:10)) == 6\nnth(4, i2c(4:10)) == 7\nnth(5, @i2c 4:10) == 8\n\n# further defined are `takewhile`, `drop`, `dropwhile`, `repeated` and `iterate`, as well as `groupby`.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"Importantly, Continuables do not support Base.iterate, i.e. you cannot directly for-loop over a Continuable. There is just no direct way to implement iterate on top of Continuables. Give it a try. Instead, you have to convert it into an Array first using collect, or to a Channel using aschannel.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"The same holds true for zip, however we provide a convenience implementation where you can choose which interpretation you want to have","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"# uses Channels and hence offers lazy execution, however might be slower\nzip(i2c(1:4), i2c(3:6), lazy=true)  # Default\n\n# uses Array, might be faster, but loads everything into memory  \nzip(i2c(1:4), i2c(3:6), lazy=false)","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"Last but not least, you can call a Continuable directly. It is just a higher order function expecting a cont function to run its computation.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"continuable = corange(3)\nforeach(print, continuable)  # 123\n# is the very same as\ncontinuable(print)  # 123","category":"page"},{"location":"manual/#The-@Ref-macro","page":"Manual","title":"The @Ref macro","text":"","category":"section"},{"location":"manual/","page":"Manual","title":"Manual","text":"As you already saw, for continuables we cannot use for-loops. Instead we use higher-order functions like map, foreach, reduce or groupbyreduce to work with Continuables.   Fortunately, julia supports beautiful do syntax for higher-order functions. In fact, do becomes the equivalent of for for continuables.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"However, importantly, a do-block constructs an anonymous function and consequently what happens within the do-block has its own variable namespace! This is essential if you want to define your own Continuables. You cannot easily change an outer variable from within a do-block like you may have done it within a for-loop. The solution is to simply use julia's Ref object to get mutations instead of simple variable assignments. For example instead of var_changing_every_loop = 0, and an update var_changing_every_loop += 1 you use var_changing_every_loop = Ref(yourvalue) and var_changing_every_loop.x += 1.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"(If you would use something mutable instead like an Vector instead of the non-mutable Int here, you of course can directly work in place. I.e. say a = [], then push!(a, i) will do the right thing also in a do-block).","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"For convenience, Continuables comes with a second macro @Ref which checks your code for variable = Ref(value) parts and replaces all plain assignments var = newvalue with var.x = newvalue. This makes for beautiful code. Let's implement reduce with it:","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"using Continuables\n@Ref function myreduce(continuable, merge, init)\n  accumulator = Ref(init)\n  continuable() do x\n    accumulator = merge(accumulator, x)\n  end\n  accumulator\nend\nmyreduce(i2c(0:5), +, 0) == 15","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"Let's check that @Ref indeed only replaced accumulator with accumulator.x. Run @macroexpand on the whole definition, i.e. @macroexpand @Ref function myreduce(...., which returns","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":":(function myreduce(continuable, merge, init)\n      accumulator = Ref(init)\n      continuable() do x\n          accumulator.x = merge(accumulator.x, x)\n      end\n      accumulator.x\n  end)","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"When combining @cont with @Ref do @cont @Ref ..., i.e. let @cont be the outer and @Ref be the inner macro.","category":"page"},{"location":"benchmark/#Benchmark","page":"Benchmark","title":"Benchmark","text":"","category":"section"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"We compare Continuables with standard Julia Channel and iterators for performance an a simple implementation of sum.","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"The equivalent Channel function to the above corange function is:","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"# standard Channel -----------------------------------------------------\nfunction chrange(r)\n  Channel{Int}(1) do ch\n    for i ∈ 1:r\n      put!(ch, i)\n    end\n  end\nend","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"The sum benchmark functions are defined as follows","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"using Continuables\n\n# Summing continuable --------------------------------------\n\n# we use a convenient macro which replaces all uses of r where r was defined as r = Ref(value) with r.x, i.e. the pointer to its referenced value.\n# The effect is that the variable assignment becomes a mutation of the Reference's field.\n# This macro leads to very clean code while being intuitively transparent.\n@Ref function sum_continuable(continuable)\n  a = Ref(0)\n  continuable() do i\n    a += i\n  end\n  a\nend\n\nfunction sum_continuable_withoutref(continuable)\n  # interestingly, this works too, however with a lot of magic happening in the background\n  # which is also decreasing performance\n  a = 0\n  continuable() do i\n    a += i\n  end\n  a\nend\n\n# Summing Task ----------------------------------------------\nfunction sum_iterable(it)\n  a = 0\n  for i in it\n    a += i\n  end\n  a\nend","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"You may need to add BenchmarkTools to your julia project by running ] add BenchmarkTools. All below are tested on the same machine, results may vary for your architecture.","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"We start with the base-line, i.e. summing up the pure range iterator:","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"julia> import BenchmarkTools.@benchmark\njulia> @benchmark sum_iterable(1:1000)\nBenchmarkTools.Trial:\n  memory estimate:  0 bytes\n  allocs estimate:  0\n  --------------\n  minimum time:     1.420 ns (0.00% GC)\n  median time:      1.706 ns (0.00% GC)\n  mean time:        1.663 ns (0.00% GC)\n  maximum time:     16.456 ns (0.00% GC)\n  --------------\n  samples:          10000\n  evals/sample:     1000","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"We reach the same performance with our self-written continuable version of range. However, as you can see below, if you do not use References everywhere (like Ref or arrays or dictionaries) then performance decreases.","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"julia> @benchmark sum_continuable(corange(1000))\nBenchmarkTools.Trial:\n  memory estimate:  0 bytes\n  allocs estimate:  0\n  --------------\n  minimum time:     1.420 ns (0.00% GC)\n  median time:      1.708 ns (0.00% GC)\n  mean time:        1.671 ns (0.00% GC)\n  maximum time:     16.778 ns (0.00% GC)\n  --------------\n  samples:          10000\n  evals/sample:     1000\n\njulia> @benchmark sum_continuable_withoutref(corange(1000))\nBenchmarkTools.Trial:\n  memory estimate:  22.81 KiB\n  allocs estimate:  1460\n  --------------\n  minimum time:     22.658 μs (0.00% GC)\n  median time:      24.315 μs (0.00% GC)\n  mean time:        28.105 μs (2.64% GC)\n  maximum time:     1.925 ms (97.74% GC)\n  --------------\n  samples:          10000\n  evals/sample:     1","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"Last but not least the Channel version of range.","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"julia> @benchmark sum_iterable(chrange(1000))\nBenchmarkTools.Trial:\n  memory estimate:  32.95 KiB\n  allocs estimate:  2026\n  --------------\n  minimum time:     28.208 ms (0.00% GC)\n  median time:      34.169 ms (0.00% GC)\n  mean time:        33.836 ms (0.00% GC)\n  maximum time:     38.737 ms (0.00% GC)\n  --------------\n  samples:          148\n  evals/sample:     1","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"Mind that 1μs = 1000ns and 1ms = 1000μs. So on median we have","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"range median x-times of range\n1:1000 1.706ns 1\ncorange(1000) summed with Ref 1.708ns 1\ncorange(1000) summed without Ref 24315ns 1.4e4\nchrange(1000) 34169000ns 2e7","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"Also note that the continuable version with Ref has 0 bytes memory footprint!","category":"page"},{"location":"benchmark/#Related-packages","page":"Benchmark","title":"Related packages","text":"","category":"section"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"There is a package called ResumableFunctions.jl with the same motivation but completely different implementation.","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"using ResumableFunctions\n\n@resumable function rfrange(n::Int)\n  for i in 1:n\n    @yield i\n  end\nend\n\n# apparently the @resumable macro relies of having Base.iterate directly available on the namespace, but Continuables also exports one, so that we have to explicitly declare which we want to use to repair this little @resumable bug\nconst iterate = Base.iterate\n@benchmark sum_iterable(rfrange(1000))","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"The resulting time are as follows on my machine:","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"BenchmarkTools.Trial:\n  memory estimate:  93.84 KiB\n  allocs estimate:  3001\n  --------------\n  minimum time:     453.640 μs (0.00% GC)\n  median time:      475.210 μs (0.00% GC)\n  mean time:        505.774 μs (1.18% GC)\n  maximum time:     4.360 ms (85.91% GC)\n  --------------\n  samples:          9869\n  evals/sample:     1","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"I.e. you see it is an impressive factor of 2.8e5 slower on median compared to the plain range or the Continuables version. It is still a factor 100 faster than the current Channels version, but the Channel one is exceptionally slow (probably because of thread-safety). And in terms of memory allocation, @resumable is even the worst of all for this very simple computation.","category":"page"},{"location":"#Continuables.jl","page":"Home","title":"Continuables.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"TLDR: Python / C# yield with performance matching plain Julia iterators  (i.e. unbelievably fast)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Continuables are generator-like higher-order functions which take a continuation as an extra argument. The key macro provided by the package is @cont which will give access to the special function cont within its scope and wraps the computation in a special Type Continuables.Continuable. It is best to think of cont in the sense of yield from Python's Generators. It generates values and takes feedback from the outer process as return value.","category":"page"},{"location":"","page":"Home","title":"Home","text":"If you come from Python, use Continuables wherever you would use generators. If you are Julia-native, Continuables can be used instead of Julia's Channels in many place with drastic performance-improvements (really drastic: in the little benchmark example below it is 20 million times faster!).","category":"page"},{"location":"","page":"Home","title":"Home","text":"This package implements all standard functions like e.g. collect, reduce, any and others. As well as functionalities known from Base.Iterators and IterTools.jl like take, dropwhile, groupby, partition, nth and others.","category":"page"},{"location":"","page":"Home","title":"Home","text":"For convenience, all methods also work for plain iterables.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Install like","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg\npkg\"add Continuables\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Use it like","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Continuables","category":"page"},{"location":"#Manual-Outline","page":"Home","title":"Manual Outline","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"manual.md\"]","category":"page"},{"location":"#main-index","page":"Home","title":"Library Index","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"library.md\"]","category":"page"}]
}
