<?php

namespace App\Http\Controllers;
use App\Http\Requests\BookStoreRequest;
use App\Models\Books;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
       $books = Books::all(); 
          
       return response()->json([
            'results' => $books
       ],200);
    }

    public function store(BookStoreRequest $request)
    {
        try {
            // Create book
            Books::create([
                'subject_name' => $request->subject_name,
                'year_level' => $request->year_level,
                'course' => $request->course,
                'available' => $request->available,
                'quantity' => $request->quantity,
                
            ]);
 
            return response()->json([
                'message' => "Item successfully created."
            ],200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    public function show($id)
    {
        try {
            // Find the book by ID
            $books = Books::findOrFail($id);

            return response()->json(['book' => $books], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Book not found.'], 404);
        }
    }


    public function update(BookStoreRequest $request, $id)
    {
        try {
            // Find book
            $books = Books::find($id);
            if(!$books){
              return $books()->json([
                'message'=>'Book Not Found.'
              ],404);
            }
       
            //echo "request : $request->image";
            $books->subject_name = $request->subject_name;
            $books->year_level = $request->year_level;
            $books->course = $request->course;
            $books->available = $request->available;
            $books->quantity = $request->quantity;
       
            // Update book
            $books->save();
       
            return response()->json([
                'message' => "Book successfully updated."
            ],200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    public function destroy($id)
    {
        $books = Books::find($id);
        if(!$books){
          return response()->json([
             'message'=>'Book Not Found.'
          ],404);
        }
         
        // Delete book
        $books->delete();
       
        return response()->json([
            'message' => "Book successfully deleted."
        ],200);
    }

    public function getBooksForYearLevelAndCourse(Request $request, $course, $year_level)
    {
        try {
            // Query the 'books' table based on year_level and course
            $books = Books::where('course', $course)
                        ->where('year_level', $year_level)
                        ->get();
            return response()->json($books);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve books.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getBooksForCourse(Request $request, $course)
    {
        try {
            // Query the 'books' table based on course
            $books = Books::where('course', $course)->get();
            return response()->json($books);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve books.', 'error' => $e->getMessage()], 500);
        }
    }
}
